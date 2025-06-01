import { UpdatableUser } from "../../../domain/entities/user/user.type";
import { RegistableUser } from "../../../domain/entities/auth/auth.type";

export type CreatePrismaUser = RegistableUser & {
    uuid: string;
    createdAt: Date;
    modifiedAt: Date;
};

export type UpdatePrismaUser = UpdatableUser

