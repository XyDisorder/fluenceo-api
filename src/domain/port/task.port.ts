import {CreatableTaskInput, GetTaskOutput, UpdatableTask} from "../entities/task/task.type";
import {Task} from "../entities/task/task.entity";

export abstract class  TaskPort {
    abstract create(task: CreatableTaskInput): Promise<void>;
    abstract findAll(): Promise<GetTaskOutput[]>;
    abstract deleteByUuid(uuid: Task['uuid']): Promise<void>;
    abstract findByUuid(uuid: Task['uuid']): Promise<GetTaskOutput | null>;
    abstract updateTaskByUuid(uuid: Task['uuid'], task: UpdatableTask): Promise<UpdatableTask>;

    /*
    findByStatus(status: Task['status']): Promise<Task[]>;
    findByTitle(title: Task['title']): Promise<Task[]>;
    findByAssignedTo(assignedTo: Task['assignedTo']): Promise<Task[]>;
    findByDueDate(dueDate: Task['dueDate']): Promise<Task[]>;
    findByPriority(priority: Task['priority']): Promise<Task[]>;
     */
}
