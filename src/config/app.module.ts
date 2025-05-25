import { Module } from '@nestjs/common';

/* ---------- Ports (domaine) ---------- */
import { TaskPort} from "../domain/port/task.port";

/* ---------- Adapters (infrastructure) ---------- */
import { PrismaTaskRepository} from "../infrastructure/prisma/task.repository";

/* ---------- Use-cases (application) ---------- */
import { CreateTaskUseCase} from "../application/use-cases/create-task.use-case";

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
    ],
})
export class AppModule {}
