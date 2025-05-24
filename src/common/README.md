# 🧩 Common Layer – Fluenceo

The `common/` folder contains **shared utilities and cross-cutting concerns** used across the application.  
It centralizes reusable building blocks that don't belong to any specific domain, but are needed throughout the API, services, or modules.

> Think of it as your **toolbox** for NestJS-specific helpers, utilities, decorators, filters, guards, interceptors, exceptions, etc.

---

## 🧠 Purpose

- Promote **code reuse** and **modularization**
- Provide a **single source of truth** for commonly used constructs
- Reduce duplication across modules
- Keep other layers focused on their primary responsibilities

---

## 📁 Typical Structure

```plaintext
common/
├── dto/ # Shared or base DTOs
├── exceptions/ # Custom HTTP / domain exceptions
│ └── not-found.exception.ts
│
├── guards/ # Access control guards
│ └── auth.guard.ts
│
├── interceptors/ # Logging, transformation, timeout, etc.
│ └── logging.interceptor.ts
│
├── filters/ # Global or scoped exception filters
│ └── http-exception.filter.ts
│
├── decorators/ # Custom parameter decorators
│ └── current-user.decorator.ts
│
└── utils/ # Generic helpers
└── uuid.ts
```

---

---

## ✅ Best Practices

| ✅ Do | ❌ Don't |
|------|---------|
| Create reusable, stateless helpers | Mix business logic here |
| Scope guards/interceptors clearly | Couple `common/` to any specific domain |
| Use `common/` for NestJS-level concerns | Implement use-cases here |
| Keep names and roles clear (`X.guard.ts`, `Y.decorator.ts`) | Dump all shared code with no structure |

---

## 📌 Example: Exception

```ts
// common/exceptions/not-found.exception.ts
import { NotFoundException } from '@nestjs/common';

export class TaskNotFoundException extends NotFoundException {
  constructor(taskId: string) {
    super(`Task with ID ${taskId} not found.`);
  }
}
```

# 🧪 Testing
- Helpers and utils can be tested in isolation

- Guards and interceptors can be tested using Nest’s testing utilities or via e2e tests.

---

#  ✅Summrary
| Role                             | ✅ |
| -------------------------------- | - |
| Reusable guards, filters, DTOs   | ✅ |
| Shared decorators and helpers    | ✅ |
| Cross-cutting technical concerns | ✅ |
| Domain-specific logic            | ❌ |
| Business rules or persistence    | ❌ |
