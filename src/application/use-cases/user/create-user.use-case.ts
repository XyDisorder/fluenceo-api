import {Injectable} from "@nestjs/common";
import {CreatableUser} from "../../../domain/entities/user/user.type";
import {UserPort} from "../../../domain/port/user.port";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userPort: UserPort) {}

    async execute(user: CreatableUser) {
         await this.userPort.createUser(user);
    }
}