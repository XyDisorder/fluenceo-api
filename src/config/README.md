# ⚙️ Config Layer – Fluenceo

The `config/` folder is responsible for managing all **environment configuration**, **global settings**, and **application constants** in a centralized and maintainable way.

---

## 🧠 Purpose

The config layer provides:
- Centralized access to `.env` variables
- Global application configuration (e.g., CORS, port, DB URL)
- Validation and type safety for environment settings
- Reusable configuration modules for other parts of the app

---

## 📁 Typical Structure

```plaintext
config/
├── config.module.ts # Global module to load configs across the app
├── config.service.ts # Provides strongly-typed access to env vars
└── validation.schema.ts # Validates env vars with Joi or Zod
```
---


---

## ✅ Best Practices

- Use **`@nestjs/config`** to load environment variables into the NestJS app
- **Validate `.env` variables** at startup to catch misconfigurations early
- Avoid accessing `process.env` directly in services — inject `ConfigService` instead
- Separate **configuration concerns** by domain (e.g., `database.config.ts`, `auth.config.ts`)

---

## 📌 Example: `config.module.ts`

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
  ],
})
export class AppConfigModule {}
```

# 📌 Accessing Config in Other Services

```ts
@Injectable()
export class SomeService {
  constructor(private config: ConfigService) {
    const dbUrl = this.config.get<string>('DATABASE_URL');
  }
}
```
---

# 🔒 .env File Example

```plaintext
DATABASE_URL=postgresql://user:pass@neon.host/db
PORT=3000
JWT_SECRET=supersecure
CORS_ORIGIN=http://localhost:3000
```


