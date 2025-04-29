import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { CORS_ORIGINS, PORT } from './config/app'
import { AppModule } from './modules/app.module'
import { ZodValidationPipe } from './pipes/zod-validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableCors({ origin: CORS_ORIGINS, credentials: true })
  app.useGlobalPipes(new ZodValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('JS App API')
    .setDescription('The JS App API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'token')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT, '0.0.0.0')

  Logger.log(`🌐 CORS Origins: ${CORS_ORIGINS}`, 'Bootstrap')
  Logger.log(`🚀 Server is up and running at: ${await app.getUrl()}`, 'Bootstrap')
}

bootstrap()
