import {UserPort} from "../../../domain/port/user.port";
import {UpdatableUser} from "../../../domain/entities/user/user.type";
import {User} from "../../../domain/entities/user/user.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userPort: UserPort) {}

    async execute(uuid: User['uuid'], user: UpdatableUser): Promise<void> {
        await this.userPort.updateByUuid(uuid, user);
    }
}