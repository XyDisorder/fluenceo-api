import {User} from "./user.entity";

export type CreatableUser = Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'profilePictureUrl' | 'pseudo'>

export type UpdatableUser  = Pick<User, 'firstName' | 'lastName' | 'profilePictureUrl' | 'pseudo'>

export type GetableUser = Omit<User, 'password'>