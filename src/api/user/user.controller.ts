import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";
import { mapUpdateUserDtoToProps} from "./mapper/user.mapper";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserUseCase } from "../../application/use-cases/user/update-user.use-case";
import { User } from "../../domain/entities/user/user.entity";
import {GetableUser} from "../../domain/entities/user/user.type";
import {FindUserUseCase} from "../../application/use-cases/user/find-user.use-case";

@Controller('user')
export class UserController {
    constructor(
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

    @Patch(':uuid')
    async updateUser(@Param('uuid') uuid: User['uuid'], @Body() dto: UpdateUserDto): Promise<void> {
        const mappedDto = mapUpdateUserDtoToProps(dto);
        await this.updateUserUseCase.execute(uuid, mappedDto);
    }
}
