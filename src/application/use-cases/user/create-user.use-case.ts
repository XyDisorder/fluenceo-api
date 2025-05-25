import {Injectable} from "@nestjs/common";
import {CreatableUser} from "../../../domain/entities/user/user.type";
import {UserPort} from "../../../domain/port/user.port";
import {PasswordHasherPort} from "../../../domain/port/password-hasher.port";

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userPort: UserPort,
            private readonly passwordHasher: PasswordHasherPort
    ) {}

    async execute(user: CreatableUser) {
        const hashedPassword = await this.passwordHasher.hash(user.password);

        await this.userPort.create({
            ...user,
            password: hashedPassword,
        });
    }
}