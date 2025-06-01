import { Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {UserPort} from "../../../domain/port/user.port";
import {PasswordHasherPort} from "../../../domain/port/password-hasher.port";
import {User} from "../../../domain/entities/user/user.entity";
import {JwtService} from "@nestjs/jwt";
import {GetableLoginUser, GetableUser} from "../../../domain/entities/user/user.type";

@Injectable()
export class LoginUseCase {
    constructor(private readonly userPort: UserPort,
                private readonly passwordHasher: PasswordHasherPort,
                private readonly jwtService: JwtService) {}

    async execute(email: User['email'], password: User['password'] ): Promise<{token: string, user: GetableLoginUser}> {
        const user = await this.userPort.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if( !user.isActive) {
            throw new UnauthorizedException('User is not active. Must validate email first.');
        }

        const isPasswordValid = await this.passwordHasher.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.jwtService.signAsync(
            { email: user.email, uuid: user.uuid },
            {expiresIn: process.env.JWT_EXPIRES_IN || '1h'});


        return {token, user };
    }
}