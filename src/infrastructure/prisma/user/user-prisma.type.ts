import {CreatableUser, UpdatableUser} from "../../../domain/entities/user/user.type";

export type CreatePrismaUser = CreatableUser & {
    uuid: string;
    createdAt: Date;
    modifiedAt: Date;
};

export type UpdatePrismaUser = UpdatableUser

