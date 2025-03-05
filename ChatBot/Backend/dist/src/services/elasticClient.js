"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/elasticClient.ts
const elasticsearch_1 = require("@elastic/elasticsearch");
const elasticClient = new elasticsearch_1.Client({
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
});
exports.default = elasticClient;
