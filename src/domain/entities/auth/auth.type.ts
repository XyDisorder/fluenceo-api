import {User} from "../user/user.entity";

export type RegistableUser = Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'profilePictureUrl' | 'pseudo'>
