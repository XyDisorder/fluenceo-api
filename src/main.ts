import { NestFactory } from '@nestjs/core';
import {AppModule} from "./config/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
