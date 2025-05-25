import {IsOptional, IsString} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    profilePictureUrl

    @IsString()
    @IsOptional()
    pseudo

    @IsString()
    @IsOptional()
    lastName

    @IsString()
    @IsOptional()
    firstName
}