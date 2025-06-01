import {RegistableUser} from "../../../domain/entities/auth/auth.type";
import {RegisterDto} from "../dto/register.dto";

export const mapRegisterUserDtoToProps = (dto: RegisterDto): RegistableUser => ({
    firstName: dto.firstName,
    lastName: dto.lastName,
    password: dto.password,
    email: dto.email,
    profilePictureUrl: dto.profilePictureUrl,
    pseudo: dto.pseudo
});
