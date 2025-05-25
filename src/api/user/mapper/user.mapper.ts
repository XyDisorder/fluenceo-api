import {CreatableUser, UpdatableUser} from "../../../domain/entities/user/user.type";
import {CreateUserDto} from "../dto/user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

export const mapCreateUserDtoToProps = (dto: CreateUserDto): CreatableUser => ({
    firstName: dto.firstName,
    lastName: dto.lastName,
    password: dto.password,
    email: dto.email,
    profilePictureUrl: dto.profilePictureUrl,
    pseudo: dto.pseudo
});

export const mapUpdateUserDtoToProps = (dto: UpdateUserDto): UpdatableUser => ({
    firstName: dto.firstName,
    lastName: dto.lastName,
    profilePictureUrl: dto.profilePictureUrl,
    pseudo: dto.pseudo
})