import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    profilePictureUrl: string

    @IsString()
    @IsNotEmpty()
    pseudo: string
}