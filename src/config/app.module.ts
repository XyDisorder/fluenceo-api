import { Module } from '@nestjs/common';

/* ---------- Ports (domaine) ---------- */
import { TaskPort} from "../domain/port/task.port";
import { UserPort} from "../domain/port/user.port";

/* ---------- Adapters (infrastructure) ---------- */
import { PrismaTaskRepository} from "../infrastructure/prisma/task/task.repository";
import { PrismaUserRepository } from "../infrastructure/prisma/user/user.repository";

/* ---------- Use-cases (application) ---------- */
import { CreateTaskUseCase} from "../application/use-cases/task/create-task.use-case";
import { FindTaskUseCase } from "../application/use-cases/task/find-task.use-case";
import { DeleteTaskUseCase } from "../application/use-cases/task/delete-task.use-case";
import { UpdateTaskUseCase} from "../application/use-cases/task/update-task.use-case";

import { CreateUserUseCase} from "../application/use-cases/user/create-user.use-case";

/* ---------- Controllers (interfaces HTTP) ---------- */
import {ConfigModule} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";
import { TaskController} from "../api/task/task.controller";
import { UserController } from "../api/user/user.controller";
import {UpdateUserUseCase} from "../application/use-cases/user/update-user.use-case";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [TaskController, UserController],
    providers: [
        PrismaService,

        // Task
        { provide: TaskPort, useClass: PrismaTaskRepository },
        CreateTaskUseCase,
        FindTaskUseCase,
        DeleteTaskUseCase,
        UpdateTaskUseCase,

        // User
        { provide: UserPort, useClass: PrismaUserRepository },
        CreateUserUseCase,
        UpdateUserUseCase,
    ],
})

export class AppModule {}

