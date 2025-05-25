import {CreateTaskDto} from "../dto/create-task.dto";
import {CreatableTaskInput, UpdatableTask} from "../../../domain/entities/task/task.type";
import {TaskStatus, TaskStatusDefault} from "../../../domain/entities/task/task-status.type";
import {UpdateTaskDto} from "../dto/update-task.dto";

export const mapCreateTaskDtoToProps = (dto: CreateTaskDto): CreatableTaskInput => ({
    title: dto.title,
    description: dto.description ?? undefined,
    priority: dto.priority ?? 0,
    assignedTo: dto.assignedTo ?? undefined,
    status: (dto.status as TaskStatus) ?? TaskStatusDefault,
    dueDate: dto.dueDate ?? undefined,
});

export const mapUpdateTaskDtoToProps = (dto: UpdateTaskDto): UpdatableTask => ({
    title: dto?.title,
    description: dto?.description,
    priority: dto?.priority,
    assignedTo: dto?.assignedTo,
    status: dto?.status as TaskStatus,
    dueDate: dto?.dueDate,
});