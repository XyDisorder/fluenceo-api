import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { LoginUseCase } from "../../application/use-cases/authentification/login.use-case";
import { RegisterUseCase } from "../../application/use-cases/authentification/register.use-case";
import { GetableUser } from "../../domain/entities/user/user.type";
import { mapRegisterUserDtoToProps } from "./mapper/auth.mapper";
import {User} from "../../domain/entities/user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase : LoginUseCase,
                private readonly registerUseCase: RegisterUseCase) {}

    @Post('login')
    async signIn(@Body() body: LoginDto) {
        const {email, password} = body;
        return this.loginUseCase.execute(email, password);
    }

    @Post('register')
    async signUp(@Body() dto: RegisterDto): Promise<GetableUser> {
        const mappedDto = mapRegisterUserDtoToProps(dto);
        return await this.registerUseCase.execute(mappedDto);
    }

    @Get('confirm-email')
    async confirmEmail(@Query('token') token: User['emailVerificationToken']): Promise<{ message: string }> {
        return await this.registerUseCase.confirmEmail(token);
    }
}