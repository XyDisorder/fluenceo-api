# 🧱 Shared Layer – Fluenceo

The `shared/` folder contains **globally reusable code** that is agnostic to any domain, infrastructure, or framework.

It serves as a home for pure TypeScript **types, constants, utility functions, or interfaces** that might be used across any layer (API, application, domain, infrastructure, etc.).

> Think of `shared/` as your **universal toolbox**, designed to stay lean, portable, and testable.

---

## 🧠 Purpose

- Centralize **generic utilities** that are **not tied to NestJS or any domain**
- Provide common **TypeScript types** and helpers
- Keep technical tools separate from business logic
- Allow easy reuse across all parts of the backend

---

## 📁 Typical Structure

```plaintext
shared/
├── types/
│ ├── uuid.type.ts # Reusable type aliases
│ ├── pagination.type.ts # Common query params
│
├── constants/
│ └── task-status.constant.ts # e.g., ['todo', 'doing', 'done']
│
├── utils/
│ └── date.utils.ts # date formatting helpers, etc.
│
└── interfaces/
└── has-id.interface.ts # Example: for entities with ID
```


---

## ✅ Best Practices

| ✅ Do                                 | ❌ Don't |
|--------------------------------------|----------|
| Use for pure TypeScript utils/types  | Put domain-specific logic here |
| Keep files small and focused         | Tie to NestJS or Prisma here |
| Reference from any layer             | Use Nest decorators here |
| Organize by category (types/constants) | Dump unrelated files here |

---

## 📌 Example: Constant

```ts
// shared/constants/entities-status.constant.ts
export const TASK_STATUSES = ['todo', 'doing', 'done'] as const;
export type TaskStatus = typeof TASK_STATUSES[number];
```

# 📌 Example: Type Alias
```ts
// shared/types/uuid.type.ts
export type UUID = string; // Can be used across entities and DTOs
export type UUIDArray = UUID[]; // For arrays of UUIDs
```

# 📌 Example: Utility Function
```ts
// shared/utils/date.utils.ts
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
}
```


# 🧪 Testing
Everything in shared/ should be easy to test using pure unit tests, without needing NestJS or external services.

```ts
describe('formatDate', () => {
  it('should format date as YYYY-MM-DD', () => {
    expect(formatDate(new Date('2025-01-01T00:00:00Z'))).toBe('2025-01-01');
  });
});
```

# ✅ Summary

| Role                            | ✅ |
| ------------------------------- | - |
| Pure TypeScript types and utils | ✅ |
| Shared constants and interfaces | ✅ |
| No framework or domain coupling | ✅ |
| NestJS-specific decorators      | ❌ |
| Business logic                  | ❌ |
