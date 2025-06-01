import {Body, Controller, Get, Post, Query, Redirect, Res} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { LoginUseCase } from "../../application/use-cases/authentification/login.use-case";
import { RegisterUseCase } from "../../application/use-cases/authentification/register.use-case";
import {GetableLoginUser, GetableUser} from "../../domain/entities/user/user.type";
import { mapRegisterUserDtoToProps } from "./mapper/auth.mapper";
import {User} from "../../domain/entities/user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase : LoginUseCase,
                private readonly registerUseCase: RegisterUseCase) {}

    @Post('login')
    async signIn(@Body() body: LoginDto): Promise<{token: string, user: GetableLoginUser}> {
        console.log('signIn called with body:', body);
        const {email, password} = body;
        return this.loginUseCase.execute(email, password);
    }

    @Post('register')
    async signUp(@Body() dto: RegisterDto): Promise<GetableUser> {
        const mappedDto = mapRegisterUserDtoToProps(dto);
        return await this.registerUseCase.execute(mappedDto);
    }

    @Get('confirm-email')
    @Redirect()
    async confirmEmail(@Query('token') token: User['emailVerificationToken']): Promise<{ url: string } | void> {
        const success = await this.registerUseCase.confirmEmail(token);
        if (success) {
            return { url: `${process.env.FRONTEND_URL}/email-verified?status=success` };
        } else {
            return { url: `${process.env.FRONTEND_URL}/email-verified?status=failed` };
        }
    }

    @Post('resent-confirmation-email')
    async resendConfirmationEmail(@Body('email') email: string): Promise<void> {
        if (!email) {
            throw new Error('Email is required to resend confirmation email');
        }
        await this.registerUseCase.resendConfirmationEmail(email);
    }
}