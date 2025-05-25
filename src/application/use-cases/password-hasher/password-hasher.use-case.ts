import {Injectable} from "@nestjs/common";
import {User} from "../../../domain/entities/user/user.entity";
import {PasswordHasherPort} from "../../../domain/port/password-hasher.port";

@Injectable()
export class PasswordHasherUseCase {
    constructor(private readonly passwordHasherPort: PasswordHasherPort){}

    async hash(password: User['password']): Promise<string> {
        return this.passwordHasherPort.hash(password);
    }

    async compare(password: User['password'], hash: string): Promise<boolean> {
        return this.passwordHasherPort.compare(password, hash);
    }
}

