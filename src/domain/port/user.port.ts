import {GetableLoginUser, GetableUser, UpdatableUser} from "../entities/user/user.type";
import {User} from "../entities/user/user.entity";
import {RegistableUser} from "../entities/auth/auth.type";

export abstract class UserPort {
    abstract create(user: RegistableUser): Promise<GetableUser>;
    abstract updateByUuid(uuid: User['uuid'], user: UpdatableUser): Promise<void>;
    abstract findByUuid(uuid: User['uuid']): Promise<GetableUser>;
    abstract findAll(): Promise<GetableUser[]>;
    abstract findByEmail(email: User['email']): Promise<GetableLoginUser | null>;
    abstract findByPseudo(pseudo: User['pseudo']): Promise<GetableLoginUser | null>;
    abstract updateEmailVerificationToken(uuid: User['uuid'], emailVerificationToken: string): Promise<void>;
    abstract markEmailAsVerified(uuid: User['uuid']): Promise<void>;
}