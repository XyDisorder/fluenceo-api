import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {TaskStatus} from "../../../domain/entities/task/task-status.type";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    priority?: number;

    @IsOptional()
    @IsString()
    assignedTo?: string;

    @IsOptional()
    @Type(() => Date)
    dueDate?: Date;

    @IsOptional()
    @IsString()
    status?: TaskStatus;
}
