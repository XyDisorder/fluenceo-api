import {User} from "./user.entity";


export type UpdatableUser  = Pick<User, 'firstName' | 'lastName' | 'profilePictureUrl' | 'pseudo'>

export type GetableUser = Omit<User, 'password'>

export type GetableLoginUser = Pick<User, 'pseudo' | 'email' | 'password' | 'uuid' | 'isActive'>