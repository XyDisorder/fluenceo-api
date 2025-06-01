import { UpdatableUser} from "../../../domain/entities/user/user.type";
import {UpdateUserDto} from "../dto/update-user.dto";

export const mapUpdateUserDtoToProps = (dto: UpdateUserDto): UpdatableUser => ({
    firstName: dto.firstName,
    lastName: dto.lastName,
    profilePictureUrl: dto.profilePictureUrl,
    pseudo: dto.pseudo
})