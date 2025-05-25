// domain/entities/entities.types.ts
import {TaskStatus} from "./task-status.type";
import {Task} from "./task.entity";


export type CreatableTaskInput = {
    title: string;
    description?: string;
    priority?: number;
    assignedTo?: string;
    status?: TaskStatus;
    dueDate?: Date;
};

export type GetTaskOutput = Pick<
    Task,
    'uuid' | 'title' | 'status' | 'priority' | 'dueDate' | 'assignedTo' | 'description' | 'modifiedAt' | 'createdAt'
    >;

export type UpdatableTask = {
    title?: string;
    description?: string;
    priority?: number;
    assignedTo?: string;
    status?: TaskStatus;
    dueDate?: Date;
}
