import {Injectable} from "@nestjs/common";
import {TaskPort} from "../../../domain/port/task.port";
import {GetTaskOutput} from "../../../domain/entities/task/task.type";
import {Task} from "../../../domain/entities/task/task.entity";

@Injectable()
export class FindTaskUseCase {
    constructor(private readonly taskPort: TaskPort) {}

    async findAllTask(): Promise<GetTaskOutput[]>{
       return await this.taskPort.findAll();
    }

    async findTaskByUuid(uuid: Task['uuid']): Promise<GetTaskOutput | null> {
        return await this.taskPort.findByUuid(uuid);
    }
}