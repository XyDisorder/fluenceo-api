import {User} from "../../../../domain/entities/user/user.entity";
import {JwtService} from "@nestjs/jwt";
import {RegistableUser} from "../../../../domain/entities/auth/auth.type";
import {GetableLoginUser, GetableUser} from "../../../../domain/entities/user/user.type";

export class  RegisterValidationHelper {
    static  generateJwtEmailToken(user: GetableUser | GetableLoginUser, jwtService: JwtService): string {
        const token = jwtService.sign(
            { uuid: user.uuid },
            { expiresIn: '1d' }
        );
        return token;
    }
}
