import {Injectable} from "@nestjs/common";
import {UserPort} from "../../../domain/port/user.port";
import {CreatableUser, UpdatableUser} from "../../../domain/entities/user/user.type";
import {PrismaService} from "../../../../prisma/prisma.service";
import {CreatePrismaUser, UpdatePrismaUser} from "./user-prisma.type";
import {randomUUID} from "crypto";
import {User} from "../../../domain/entities/user/user.entity";

@Injectable()
export class PrismaUserRepository implements UserPort {
    constructor(private readonly prisma: PrismaService) {}


    async createUser(user: CreatableUser): Promise<void> {
        const data: CreatePrismaUser = {
            uuid: randomUUID() as string,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            profilePictureUrl: user.profilePictureUrl,
            pseudo: user.pseudo,
            createdAt: new Date(),
            modifiedAt: new Date()
        }
        await this.prisma.user.create({ data });
    }

    async updateUser(uuid: User['uuid'], user: UpdatableUser): Promise<void> {
        const updatableUser : UpdatePrismaUser = user;
        await this.prisma.user.update({
            where: { uuid },
            data : updatableUser,
        })
    }
}