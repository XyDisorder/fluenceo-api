import { Module } from '@nestjs/common';

/* ---------- Ports (domaine) ---------- */
import { TaskPort} from "../domain/port/task.port";
import { UserPort} from "../domain/port/user.port";
import { PasswordHasherPort } from "../domain/port/password-hasher.port";
import { EmailPort } from "../domain/port/email.port";

/* ---------- Adapters (infrastructure) ---------- */
import { PrismaTaskRepository} from "../infrastructure/prisma/task/task.repository";
import { PrismaUserRepository } from "../infrastructure/prisma/user/user.repository";

// External service (Infrastructure)
import { BcryptHasherService} from "../infrastructure/crypto/bcrypt-hasher.service";

/* ---------- Use-cases (application) ---------- */
// TASK
import { CreateTaskUseCase} from "../application/use-cases/task/create-task.use-case";
import { FindTaskUseCase } from "../application/use-cases/task/find-task.use-case";
import { DeleteTaskUseCase } from "../application/use-cases/task/delete-task.use-case";
import { UpdateTaskUseCase} from "../application/use-cases/task/update-task.use-case";

// USER
import {UpdateUserUseCase} from "../application/use-cases/user/update-user.use-case";
import {FindUserUseCase} from "../application/use-cases/user/find-user.use-case";

// Authentification
 import {LoginUseCase} from "../application/use-cases/authentification/login.use-case";
 import {RegisterUseCase} from "../application/use-cases/authentification/register.use-case";


/* ---------- Controllers (interfaces HTTP) ---------- */
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";
import { TaskController} from "../api/task/task.controller";
import { UserController } from "../api/user/user.controller";
import { AuthController } from "../api/auth/auth.controller";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {envValidationSchema} from "../../env.validation";
import {NodemailerEmailService} from "../infrastructure/email/nodemailer-email.service";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true,  validationSchema: envValidationSchema }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d' },
            }),
        }),
    ],
    controllers: [TaskController, UserController,  AuthController],
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
        UpdateUserUseCase,
        FindUserUseCase,
        // Authentification
        { provide: PasswordHasherPort, useClass: BcryptHasherService },
        LoginUseCase,
        RegisterUseCase,
        // Email
         { provide: EmailPort, useClass: NodemailerEmailService },
         // Uncomment and implement if needed
    ],
})

export class AppModule {}

