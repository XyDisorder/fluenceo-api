// domain/entities/entities.types.ts
import {TaskStatus} from "./task-status.type";


export type CreatableTaskInput = {
    title: string;
    description?: string;
    priority?: number;
    assignedTo?: string;
    status?: TaskStatus;
    dueDate?: Date;
};