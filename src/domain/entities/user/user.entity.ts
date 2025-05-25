export class User {
    constructor(
        public readonly uuid: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public profilePictureUrl: string,
        public pseudo: string,
        public readonly createdAt: Date = new Date(),
        public modifiedAt: Date = new Date(),
    ) {}
}