import {Injectable} from "@nestjs/common";
import {TaskPort} from "../../../domain/port/task.port";
import {Task} from "../../../domain/entities/task/task.entity";

@Injectable()
export class DeleteTaskUseCase {
    constructor(private readonly taskPort: TaskPort) {}

    async execute(uuid: Task['uuid']): Promise<void> {
        await this.taskPort.deleteByUuid(uuid);
    }
}