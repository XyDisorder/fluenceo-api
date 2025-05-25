import { Module } from '@nestjs/common';

/* ---------- Ports (domaine) ---------- */
import { TaskPort} from "../domain/port/task.port";

/* ---------- Adapters (infrastructure) ---------- */
import { PrismaTaskRepository} from "../infrastructure/prisma/task.repository";

/* ---------- Use-cases (application) ---------- */
import { CreateTaskUseCase} from "../application/use-cases/task/create-task.use-case";
import { FindTaskUseCase } from "../application/use-cases/task/find-task.use-case";
import { DeleteTaskUseCase } from "../application/use-cases/task/delete-task.use-case";
import { UpdateTaskUseCase} from "../application/use-cases/task/update-task.use-case";

/* ---------- Controllers (interfaces HTTP) ---------- */
import { TaskController} from "../api/task/task.controller";
import {ConfigModule} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],

    controllers: [TaskController],

    /* Providers available to inject */
    providers: [
        /* ---- Infrastructure ---- */
        PrismaService,
        /* ---- Ports → Adapters ---- */
        { provide: TaskPort, useClass: PrismaTaskRepository },
        /* ---- Use-cases ---- */
        CreateTaskUseCase,
        FindTaskUseCase,
        DeleteTaskUseCase,
        UpdateTaskUseCase,
    ],
})
export class AppModule {}
