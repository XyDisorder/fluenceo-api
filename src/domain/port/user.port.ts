import {CreatableUser, GetableUser, UpdatableUser} from "../entities/user/user.type";
import {User} from "../entities/user/user.entity";

export abstract class UserPort {
    abstract create(user: CreatableUser): Promise<void>;
    abstract updateByUuid(uuid: User['uuid'], user: UpdatableUser): Promise<void>;
    abstract findByUuid(uuid: User['uuid']): Promise<GetableUser>;
    abstract findAll(): Promise<GetableUser[]>;
}