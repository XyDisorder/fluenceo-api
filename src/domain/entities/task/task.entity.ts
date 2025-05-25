import {TaskStatus} from "./task-status.type";

export class Task {
    constructor(
        public readonly uuid: string,
        public title: string,
        public description: string,
        public priority: number,
        public assignedTo: string | null,
        public status: TaskStatus,
        public readonly createdAt: Date = new Date(),
        public modifiedAt: Date = new Date(),
        public dueDate: Date | null = null
    ) {}

    markAsDone() {
        this.status = 'done';
    }

}
