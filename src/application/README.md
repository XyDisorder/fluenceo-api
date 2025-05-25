# 🧩 Application Layer – Fluenceo

The `application/` layer orchestrates the **business use cases** of Fluenceo.  
It acts as the middle layer between the **domain logic** and the **infrastructure layer** (database, external APIs).

> This is where the **"what should happen"** is coordinated, based on **rules defined in the domain**.

---

## 🧠 Purpose

The application layer is responsible for:
- Executing **use cases** (e.g. create a task, mark it as done, sync pull requests)
- **Coordinating dependencies** (repositories, services, external APIs)
- Enforcing **business workflows** defined by the domain layer
- Acting as the **entry point for controllers or schedulers**

---

## 📁 Example of Folder Structure
```plaintext
application/
├── use-cases/
│ ├── create-task.usecase.ts # Contains the orchestration logic for creating a task
│ ├── get-tasks.usecase.ts
│ └── sync-github-prs.usecase.ts
│
└── interfaces/
└── task.port.ts # Contracts used by the use cases, implemented in infrastructure/
└── github.service.interface.ts # Interfaces for external services
```


---

## ✅ Best Practices

- Use **explicit use case classes** (e.g. `CreateTaskUseCase`)
- The use cases depend only on **interfaces**, not on concrete implementations (thanks to dependency injection)
- Keep them **pure and testable**, with no framework logic or decorators
- Handle **application-level orchestration**, not domain logic (business rules go in `domain/`)

---

## 📌 Example Use Case

```ts
@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepo: TaskRepository) {}

  async execute(dto: { title: string }) {
    const task = new Task(uuid(), dto.title, 'todo', new Date());
    return this.taskRepo.save(task);
  }
}
```

# 📌 Example Interface

```ts
export interface TaskRepository {
  save(task: Task): Promise<void>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
}
export interface GithubService {
  syncPullRequests(): Promise<void>;
}
```

# 🧪 Testing
Use cases can be unit tested with mocked interfaces

No external dependency is needed to validate business workflows

```ts 
it('should create a entities', async () => {
  const repo: TaskRepository = { save: jest.fn() };
  const useCase = new CreateTaskUseCase(repo);
  await useCase.execute({ title: 'Test' });
  expect(repo.save).toHaveBeenCalled();
});
```


