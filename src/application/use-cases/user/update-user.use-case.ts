import {UserPort} from "../../../domain/port/user.port";
import {UpdatableUser} from "../../../domain/entities/user/user.type";
import {User} from "../../../domain/entities/user/user.entity";

export class UpdateUserUseCase {
    constructor(private readonly userPort: UserPort) {}

    async execute(uuid: User['uuid'], user: UpdatableUser): Promise<void> {
        await this.userPort.updateUser(uuid, user);
    }
}