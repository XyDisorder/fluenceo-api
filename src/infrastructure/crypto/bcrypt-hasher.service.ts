import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import {PasswordHasherPort} from "../../domain/port/password-hasher.port";

@Injectable()
export class BcryptHasherService implements PasswordHasherPort {
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
