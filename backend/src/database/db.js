"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbPool = getDbPool;
const promise_1 = __importDefault(require("mysql2/promise"));
const autentificacion_1 = require("../routes/autentificacion"); //importada dbConfig desde autentificacion para chuquear que haya conexion
let pool = null;
function getDbPool() {
    if (!autentificacion_1.dbConfig) {
        throw new Error('No hay configuración de base de datos válida');
    }
    if (!pool) {
        pool = promise_1.default.createPool({
            host: autentificacion_1.dbConfig.host,
            port: autentificacion_1.dbConfig.port,
            database: autentificacion_1.dbConfig.database,
            user: autentificacion_1.dbConfig.user,
            password: autentificacion_1.dbConfig.password,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    return pool;
}
