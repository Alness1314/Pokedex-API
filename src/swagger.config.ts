import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
    .setTitle('Pokedex')
    .setDescription('The pokemon information from the pokedex')
    .setVersion('1.0')
    .build();
  

  const options: SwaggerCustomOptions = {
    useGlobalPrefix: true,
    customSiteTitle: 'Pokedex-api',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);
};