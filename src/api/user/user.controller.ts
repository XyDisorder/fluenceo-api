import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";
import { CreateUserUseCase } from "../../application/use-cases/user/create-user.use-case";
import { CreateUserDto } from "./dto/user.dto";
import {mapCreateUserDtoToProps, mapUpdateUserDtoToProps} from "./mapper/user.mapper";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserUseCase } from "../../application/use-cases/user/update-user.use-case";
import { User } from "../../domain/entities/user/user.entity";
import {GetableUser} from "../../domain/entities/user/user.type";
import {FindUserUseCase} from "../../application/use-cases/user/find-user.use-case";

@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly findUserUseCase: FindUserUseCase
    ) {}

    @Get()
    async getAllUser(): Promise<GetableUser[]> {
        return await this.findUserUseCase.findAll();
    }

    @Get(':uuid')
    async getUserByUuid(@Param('uuid') uuid: User['uuid']): Promise<GetableUser> {
        return await this.findUserUseCase.findByUuid(uuid);

    }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        const mappedDto = mapCreateUserDtoToProps(dto);
        await this.createUserUseCase.execute(mappedDto);
    }

    @Patch(':uuid')
    async updateUser(@Param('uuid') uuid: User['uuid'], @Body() dto: UpdateUserDto): Promise<void> {
        const mappedDto = mapUpdateUserDtoToProps(dto);
        await this.updateUserUseCase.execute(uuid, mappedDto);
    }
}
