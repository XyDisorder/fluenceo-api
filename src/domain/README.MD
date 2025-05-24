# 📦 Domain Layer – Fluenceo

This `domain/` folder contains the **core business logic** of the Fluenceo backend.  
It represents the **inner layer** of the Hexagonal or Clean Architecture pattern and should have **no dependencies on external frameworks or libraries** (e.g. NestJS, Prisma, Axios, etc.).

---

## 🧠 Purpose

The domain layer is responsible for:
- Defining **business entities** (e.g. `Task`, `User`)
- Encapsulating **domain rules and behaviors**
- Modeling **Value Objects** that represent domain-specific types
- Providing a **framework-agnostic representation** of your system

> In short: this layer defines the **"what"**, not the **"how"**.

---


---

## ✅ Best Practices

- 🚫 No imports from Prisma, NestJS, or any infrastructure libraries
- ✅ Use **explicit constructors** and **factory methods**
- 🧠 Place **business behavior** inside your entities (`task.markAsDone()`, etc.)
- ✅ Keep **value objects immutable** and validated

---

## 📁 Example of Folder Structure
```plaintext
domain/
├── task/
│ ├── task.entity.ts # Core Task entity
│ └── value-objects/ # Domain-specific immutable objects (e.g. TaskStatus, TaskTitle)
│
└── user/
├── user.entity.ts
└── value-objects/
└── UserEmail.ts # Domain-specific immutable objects (e.g. UserEmail, UserName)
```


## 📌 Example: Task Entity

```ts
export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public status: 'todo' | 'doing' | 'done',
    public readonly createdAt: Date
  ) {}

  markAsDone() {
    this.status = 'done';
  }

  isCompleted(): boolean {
    return this.status === 'done';
  }
}   
```

📌 Example: TaskTitle Value Object
```ts
export class TaskTitle {
  constructor(private readonly value: string) {
    if (value.trim().length === 0) {
      throw new Error('Task title cannot be empty.');
    }
  }

  get(): string {
    return this.value;
  }
}
```

# 🔄 Usage
Entities from the domain layer are consumed by application use-cases, and are persisted through repositories defined in application/interfaces.


# 🧪 Unit Testing
You can test this logic without NestJS or a database:

```ts
const task = new Task(uuid(), 'Demo task', 'todo', new Date());
task.markAsDone();
expect(task.status).toBe('done');
```