import {Injectable} from "@nestjs/common";
import {User} from "../entities/user/user.entity";

@Injectable()
export abstract class EmailPort {
    abstract sendConfirmationEmail(email: User['email'], token: User['emailVerificationToken']): Promise<void>;
}