import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para o frontend em localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000', // <- porta onde o frontend está rodando
  });

  await app.listen(3001); // <- porta do back-end
  console.log('🚀 Back-end rodando em http://localhost:3001');
}
bootstrap();
