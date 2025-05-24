# 🌐 API Layer – Fluenceo

The `api/` folder contains the **entry points** to the application — typically implemented as REST controllers (or GraphQL resolvers if applicable).

This layer is the only one exposed to the outside world, and it is responsible for:
- Receiving HTTP requests
- Validating input (via DTOs, pipes)
- Calling use cases from the `application/` layer
- Formatting and returning responses

> The API layer should contain **no business logic**. That belongs to the domain and application layers.

---

## 🧠 Purpose

- Expose the application's functionality via REST endpoints
- Act as a thin adapter between the transport layer (HTTP) and the internal logic
- Delegate all logic to services, use cases, and repositories
- Keep controllers **small, focused and stateless**

---

## 📁 Folder Structure

```plaintext
api/
├── task/
│ ├── task.controller.ts # HTTP endpoints for tasks
│ └── dto/
│ └── create-task.dto.ts # Validates incoming payloads
│
├── auth/
│ ├── auth.controller.ts
│ └── dto/
│
└── user/
  ├── user.controller.ts # HTTP endpoints for users
  └── dto/
    └── create-user.dto.ts # Validates incoming user data
```


---

## ✅ Best Practices

| Do | Don't |
|-----|------|
| Keep controllers thin | Put logic in controllers |
| Validate input with DTOs | Trust raw `req.body` |
| Return only what the client needs | Expose raw domain entities |
| Call use cases or services | Talk directly to infrastructure (e.g., Prisma) |

---

## 📌 Example: Task Controller

```ts
@Controller('tasks')
export class TaskController {
  constructor(private readonly createTask: CreateTaskUseCase) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.createTask.execute(dto);
  }

  @Get()
  findAll() {
    return this.createTask.listAll(); // or call a separate use-case
  }
}
```

# 🧪 Testing
- Controllers can be tested using NestJS e2e tests

- Focus unit tests on use cases and domain entities, not the API layer

- Use supertest or Postman for integration/e2e testing

# ✅ Summary 


| Role                             | ✅ |
| -------------------------------- | - |
| Input validation (DTOs, pipes)   | ✅ |
| Calling application use cases    | ✅ |
| Sending HTTP responses           | ✅ |
| Business logic / database access | ❌ |
| Dependency on external APIs      | ❌ |
