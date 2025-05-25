import {CreateTaskDto} from "../dto/create-task.dto";
import {CreatableTaskInput} from "../../../domain/entities/task/task.type";
import {TaskStatus, TaskStatusDefault} from "../../../domain/entities/task/task-status.type";

export const mapCreateTaskDtoToProps = (dto: CreateTaskDto): CreatableTaskInput => ({
    title: dto.title,
    description: dto.description ?? undefined,
    priority: dto.priority ?? 0,
    assignedTo: dto.assignedTo ?? undefined,
    status: (dto.status as TaskStatus) ?? TaskStatusDefault,
    dueDate: dto.dueDate ?? undefined,
});