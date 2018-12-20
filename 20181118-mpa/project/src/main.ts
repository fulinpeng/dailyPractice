import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import swig from 'swig'
const swig = require('swig');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(__dirname + '/public');
  app.setBaseViewsDir(__dirname + '/views');
  app.engine('html', swig.renderFile);
  app.setViewEngine('html');
  await app.listen(3000);
}
bootstrap();
