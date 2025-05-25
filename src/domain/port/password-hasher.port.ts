import {Injectable} from "@nestjs/common";
import {User} from "../entities/user/user.entity";

@Injectable()
export abstract class PasswordHasherPort {
    abstract hash(password: User['password']): Promise<string>
    abstract compare(password: User['password'], hash: string): Promise<boolean>;
}