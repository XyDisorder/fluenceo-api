import {Body, Controller, Delete, Get, Injectable, Param, Patch, Post, Put} from "@nestjs/common";
import {CreateTaskUseCase} from "../../application/use-cases/task/create-task.use-case";
import {CreateTaskDto} from "./dto/create-task.dto";
import {mapCreateTaskDtoToProps, mapUpdateTaskDtoToProps} from "./mapper/task.mapper";
import {FindTaskUseCase} from "../../application/use-cases/task/find-task.use-case";
import {GetTaskOutput, UpdatableTask } from "../../domain/entities/task/task.type";
import {DeleteTaskUseCase} from "../../application/use-cases/task/delete-task.use-case";
import {Task} from "../../domain/entities/task/task.entity";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {UpdateTaskUseCase} from "../../application/use-cases/task/update-task.use-case";


@Controller('task')
export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly findTaskUseCase: FindTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase
    ) {}

    @Get()
    async getAllTasks(): Promise<GetTaskOutput[]> {
       return await this.findTaskUseCase.findAllTask();
    }

    @Get(':uuid')
    async getTaskByUuid(@Param('uuid') uuid: Task['uuid']): Promise<GetTaskOutput | null> {
        return await this.findTaskUseCase.findTaskByUuid(uuid);
    }

    @Post()
    async createTask(@Body() task: CreateTaskDto): Promise<void> {
        const mappedDto = mapCreateTaskDtoToProps(task);
        await this.createTaskUseCase.execute(mappedDto);
    }

    @Patch(':uuid')
    async updateTask(@Param('uuid') uuid: Task['uuid'], @Body() task: UpdateTaskDto): Promise<UpdatableTask> {
        const mappedDto = mapUpdateTaskDtoToProps(task);
        return await this.updateTaskUseCase.execute(uuid, mappedDto);
    }

    @Delete(':uuid')
    async deleteTaskByUuid(@Param('uuid') uuid: Task['uuid']): Promise<void> {
        await this.deleteTaskUseCase.execute(uuid);
    }
}