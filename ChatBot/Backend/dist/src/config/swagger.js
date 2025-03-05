"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
// src/config/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
const specs = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
}
