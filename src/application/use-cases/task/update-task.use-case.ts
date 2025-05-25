import {Injectable} from "@nestjs/common";
import {TaskPort} from "../../../domain/port/task.port";
import {UpdatableTask} from "../../../domain/entities/task/task.type";
import {Task} from "../../../domain/entities/task/task.entity";

@Injectable()
export class UpdateTaskUseCase {
    constructor(private readonly taskPort: TaskPort){}

    async execute(uuid: Task['uuid'], task: UpdatableTask): Promise<UpdatableTask> {
        return await this.taskPort.updateTaskByUuid(uuid, task);
    }
}