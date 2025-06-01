import {User} from "../../../domain/entities/user/user.entity";

export class LoginDto {
    email: User['email'];
    password: User['password'];
    rememberMe?: boolean; // TODO implement remember me functionality
}