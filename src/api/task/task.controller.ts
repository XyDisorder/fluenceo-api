import {Body, Controller, Get, Injectable, Post} from "@nestjs/common";
import {CreateTaskUseCase} from "../../application/use-cases/create-task.use-case";
import {CreateTaskDto} from "./dto/create-task.dto";
import {mapCreateTaskDtoToProps} from "./mapper/task.mapper";


@Controller('task')
export class TaskController {
    constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

    @Post()
    async createTask(@Body() task: CreateTaskDto): Promise<void> {
        const mappedDto = mapCreateTaskDtoToProps(task);
        await this.createTaskUseCase.execute(mappedDto);
    }
}