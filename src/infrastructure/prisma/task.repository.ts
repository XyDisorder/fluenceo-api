import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma/prisma.service";
import {CreatableTaskInput} from "../../domain/entities/task/task.type";
import {randomUUID} from "crypto";
import {TaskStatusDefault} from "../../domain/entities/task/task-status.type";
import {CreatePrismaTask} from "./task-prisma.type";
import {TaskPort} from "../../domain/port/task.port";

@Injectable()
export class PrismaTaskRepository implements TaskPort {
    constructor(private readonly prisma: PrismaService) {
    }
    async create(input: CreatableTaskInput): Promise<void> {
        const now = new Date();
        const data: CreatePrismaTask = {
            uuid: randomUUID(),
            title: input.title,
            description: input.description || null,
            priority: input.priority || 0,
            assignedTo: input.assignedTo || null,
            status: input.status || TaskStatusDefault,
            dueDate: input.dueDate || null,
            createdAt: now,
            modifiedAt: now
        };

        await this.prisma.task.create({ data });
    }
}



