# 🗄️ Database Layer – Fluenceo

This folder contains all database-related logic and configuration for the Fluenceo backend.  
It includes the **schema definition**, **migrations**, **seed data**, and **repository implementations** used to persist entities from the `domain/` layer.

> The database layer is part of the infrastructure — it implements the repository interfaces defined in the application layer.

---

## 📁 Structure

```plaintext
infrastructure/
└── database/
├── prisma/
│ ├── schema.prisma # Main database schema
│ ├── migrations/ # Auto-generated migrations (Prisma)
│ └── prisma.service.ts # Prisma client wrapper for NestJS
│
├── task.repository.ts # Implements TaskRepository
└── user.repository.ts # Implements UserRepository
```

---


---

## ✅ Responsibilities

- Provide a **clear separation** between database logic and business logic
- Serve as the **concrete implementation** of the application-layer repository interfaces
- Manage **database schema** (via Prisma)
- Handle **database lifecycle**, connection pooling, seeding, and migrations

---

## 🔧 `prisma/` subfolder

| File / Folder         | Description |
|-----------------------|-------------|
| `schema.prisma`       | Defines your data models and relations |
| `migrations/`         | Auto-generated SQL migrations |
| `prisma.service.ts`   | NestJS wrapper for PrismaClient |
| `seed.ts` *(optional)*| Script to seed the database for local dev/testing |

---

## 📌 Example: `TaskRepository` Implementation

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
    const tasks = await this.prisma.task.findMany();
    return tasks.map(t => new Task(t.id, t.title, t.status, t.createdAt));
  }
}
```

# 🧪 Testing

- The database layer is typically tested via integration tests

- Repository methods can be tested directly with a test database or mocked PrismaClient

# ✅ Best Practices
- Isolate ORM-specific logic (e.g. Prisma) under database/prisma/

- Keep repository classes framework-agnostic from the application layer’s perspective

- Use DI to swap implementations easily (for mocking or future ORM change)