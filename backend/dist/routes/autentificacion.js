"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.authRouter = void 0;
// backend/src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const router = express_1.default.Router();
exports.authRouter = router;
// Esta variable guardará temporalmente la conexión si es válida
let dbConfig = null;
exports.dbConfig = dbConfig;
router.post('/connect', async (req, res) => {
    const { host, port, database, user, password } = req.body;
    try {
        const conn = await promise_1.default.createConnection({
            host,
            port: Number(port),
            database,
            user,
            password
        });
        await conn.query('SELECT 1'); // test query
        await conn.end();
        // Guardamos la config si es válida
        exports.dbConfig = dbConfig = { host, port: Number(port), database, user, password };
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.error('Connection failed:', err.message);
        res.status(401).json({ success: false, message: 'Datos incorrectos o conexión fallida.' });
    }
});
router.get('/config', (req, res) => {
    if (dbConfig) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(403).json({ success: false });
    }
});
