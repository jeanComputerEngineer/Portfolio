// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ChatBot API',
            version: '1.0.0',
            description: 'Documentação da API do ChatBot',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:6000',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
