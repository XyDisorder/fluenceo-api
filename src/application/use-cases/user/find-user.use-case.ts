import {Injectable} from "@nestjs/common";
import {UserPort} from "../../../domain/port/user.port";
import {User} from "../../../domain/entities/user/user.entity";
import {GetableUser} from "../../../domain/entities/user/user.type";

@Injectable()
export class FindUserUseCase {
    constructor(private readonly userPort: UserPort) {}

    async findByUuid(uuid: User['uuid']): Promise<GetableUser> {
        return await this.userPort.findByUuid(uuid);
    }

    async findAll(): Promise<GetableUser[]> {
        return await this.userPort.findAll();
    }

}