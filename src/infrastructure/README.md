# 🏗 Infrastructure Layer – Fluenceo

The `infrastructure/` layer contains all the **concrete implementations** that interact with the outside world:  
→ database access, external APIs (GitHub, GitLab, Google Calendar), schedulers, and anything technical or framework-specific.

> This is where the **"how" things work** is implemented.

---

## 🧠 Purpose

This layer is responsible for:
- Implementing **repository interfaces** defined in the `application/` layer
- Calling **external APIs** (e.g. GitHub, GitLab)
- Managing **data persistence** (e.g. Prisma, PostgreSQL)
- Handling **cron jobs**, schedulers, or background tasks

> The infrastructure layer **depends on interfaces**, not the other way around.

---

## 📁 Example of Folder Structure

```plaintext
infrastructure/
├── prisma/
│ ├── prisma.service.ts # Initializes PrismaClient
│ └── task.repository.ts # Implements TaskRepository interface
│
├── github/
│ └── github.pr-service.ts # Fetch pull requests via GitHub API
│
├── gitlab/
│ └── gitlab.pr-service.ts
│
├── calendar/
│ └── google-calendar.service.ts
│
└── schedulers/
└── sync-mr.cron.ts # Periodic jobs for syncing data
```


---

## ✅ Best Practices

- Implement only what is defined in `application/interfaces`
- Never put business rules here — logic belongs in `domain/`
- Keep all **external dependencies** isolated in this layer
- Wrap SDKs and HTTP clients in **adapter services** to avoid leaking third-party APIs

---

## 📌 Example: Task Repository Implementation

```ts
@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(task: Task): Promise<void> {
    await this.prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        status: task.status,
        createdAt: task.createdAt,
      },
    });
  }

  async findAll(): Promise<Task[]> {
    const rawTasks = await this.prisma.task.findMany();
    return rawTasks.map(t => new Task(t.id, t.title, t.status, t.createdAt));
  }
}
```

# 🧪 Testing
Infrastructure code is best tested using integration or E2E tests (e.g. with a test DB or mocked APIs).
Don't unit test concrete infrastructure in isolation — test it via use-cases or as part of flows.

# 🔄 Relationship Diagram

```mermaid
Controllers → UseCases → Interfaces (application/)
                           ↓
                    Implementations (infrastructure/)
                           ↓
                    External Systems (DB, APIs)
```
