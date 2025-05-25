import {TaskStatus} from "../../domain/entities/task/task-status.type";

export type CreatePrismaTask = {
    uuid: string;
    title: string;
    description: string | null;
    priority: number;
    assignedTo: string | null;
    status: TaskStatus;
    createdAt: Date;
    modifiedAt: Date;
    dueDate: Date | null;
};
