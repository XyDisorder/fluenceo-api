import {Injectable} from "@nestjs/common";
import {TaskPort } from "../../../domain/port/task.port";
import {CreatableTaskInput} from "../../../domain/entities/task/task.type";

@Injectable()
export class CreateTaskUseCase {
    constructor(private readonly taskPort: TaskPort) {}

    async execute(task: CreatableTaskInput): Promise<void> {
        await this.taskPort.create(task);
    }
}