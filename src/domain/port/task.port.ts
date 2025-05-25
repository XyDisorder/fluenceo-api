import { CreatableTaskInput } from "../entities/task/task.type";

export abstract class  TaskPort {
    abstract create(task: CreatableTaskInput): Promise<void>;
    /*
    findAll(): Promise<Task[]>;
    findByUuid(uuid: Task['uuid']): Promise<Task | null>;
    deleteByUuid(uuid: Task['uuid']): Promise<void>;
    findByStatus(status: Task['status']): Promise<Task[]>;
    findByTitle(title: Task['title']): Promise<Task[]>;
    findByAssignedTo(assignedTo: Task['assignedTo']): Promise<Task[]>;
    findByDueDate(dueDate: Task['dueDate']): Promise<Task[]>;
    findByPriority(priority: Task['priority']): Promise<Task[]>;
     */
}
