import {CreatableUser, UpdatableUser} from "../entities/user/user.type";
import {User} from "../entities/user/user.entity";

export abstract class UserPort {
    abstract createUser(user: CreatableUser);
    abstract updateUser(uuid: User['uuid'], user: UpdatableUser);
}