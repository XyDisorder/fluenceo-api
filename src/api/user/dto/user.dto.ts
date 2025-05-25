import {IsNotEmpty, IsString} from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
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
    @IsNotEmpty()
    profilePictureUrl: string

    @IsString()
    @IsNotEmpty()
    pseudo: string
}