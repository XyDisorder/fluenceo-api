import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PasswordHasherPort } from "../../../domain/port/password-hasher.port";
import { UserPort } from "../../../domain/port/user.port";
import { RegistableUser } from "../../../domain/entities/auth/auth.type";
import { GetableUser } from "../../../domain/entities/user/user.type";
import {JwtService} from "@nestjs/jwt";
import {RegisterValidationHelper} from "./helpers/registerValidation.helper";
import {EmailPort} from "../../../domain/port/email.port";
import {User} from "../../../domain/entities/user/user.entity";

@Injectable()
export class RegisterUseCase {
     constructor(private readonly userPort: UserPort,
                 private readonly passwordHasher: PasswordHasherPort,
                 private readonly emailPort: EmailPort,
                 private readonly jwtService: JwtService) {}

     async execute(user: RegistableUser): Promise<GetableUser> {
         const [existingByEmail, existingByPseudo] = await Promise.all([
             this.userPort.findByEmail(user.email),
             this.userPort.findByPseudo(user.pseudo),
         ]);

         if (existingByEmail) {
             throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
         }

         if (existingByPseudo) {
             throw new HttpException('Pseudo already exists', HttpStatus.BAD_REQUEST);
         }

         user.password = await this.passwordHasher.hash(user.password);
         if(!user.password || user.password.length < 8) {
                throw new HttpException('Password must be at least 8 characters long', HttpStatus.BAD_REQUEST);
         }

         const createdUser = await this.userPort.create(user);
         const token = RegisterValidationHelper.generateJwtEmailToken(createdUser, this.jwtService);

         await this.userPort.updateEmailVerificationToken(createdUser.uuid, token);

         await this.emailPort.sendConfirmationEmail(createdUser.email, token);
         return createdUser;
     }

     async confirmEmail(token: User['emailVerificationToken']): Promise<{ message: string }> {
            if (!token) {
                throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
            }
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.userPort.findByUuid(payload.uuid);

            if (!user) {
                throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            }

            if (user.isActive) {
                throw new HttpException('Email already verified', HttpStatus.BAD_REQUEST);
            }

            await this.userPort.markEmailAsVerified(user.uuid);
            return { message: 'Email successfully verified' };
     }

     async resendConfirmationEmail(email: string): Promise<void> {
            if (!email) {
                throw new HttpException('Email is required to resend confirmation email', HttpStatus.BAD_REQUEST);
            }

            const user = await this.userPort.findByEmail(email);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            if (user.isActive) {
                throw new HttpException('Email already verified', HttpStatus.BAD_REQUEST);
            }

            const token = RegisterValidationHelper.generateJwtEmailToken(user, this.jwtService);
            await this.userPort.updateEmailVerificationToken(user.uuid, token);

            await this.emailPort.sendConfirmationEmail(user.email, token);
     }
}