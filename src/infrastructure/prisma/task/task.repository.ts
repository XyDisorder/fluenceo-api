import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../../prisma/prisma.service";
import {CreatableTaskInput, GetTaskOutput, UpdatableTask} from "../../../domain/entities/task/task.type";
import {randomUUID} from "crypto";
import { TaskStatusDefault} from "../../../domain/entities/task/task-status.type";
import {CreatePrismaTask, UpdatePrismaTask} from "./task-prisma.type";
import {TaskPort} from "../../../domain/port/task.port";
import {Task} from "../../../domain/entities/task/task.entity";

@Injectable()
export class PrismaTaskRepository implements TaskPort {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<GetTaskOutput[]> {
        const rows = await this.prisma.task.findMany();
        return rows as GetTaskOutput[];
    }

    async findByUuid(uuid: Task['uuid']): Promise<GetTaskOutput> {
        const result = await this.prisma.task.findUnique({
            where: {
                uuid: uuid
            }
        });
        return result as GetTaskOutput;
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

    async updateTaskByUuid(uuid: Task['uuid'], task: UpdatableTask): Promise<UpdatableTask> {
        const updated = await this.prisma.task.update({
            where: {uuid},
            data: task,
        });

        return updated as UpdatableTask;
    }

    async deleteByUuid(uuid: Task['uuid']) {
        await this.prisma.task.delete({
            where: {
                uuid: uuid
            }
        })
    }
}



