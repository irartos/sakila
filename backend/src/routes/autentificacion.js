"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.post('/connect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { host, port, database, user, password } = req.body;
    try {
        const conn = yield promise_1.default.createConnection({
            host,
            port: Number(port),
            database,
            user,
            password
        });
        yield conn.query('SELECT 1'); // test query
        yield conn.end();
        // Guardamos la config si es válida
        exports.dbConfig = dbConfig = { host, port: Number(port), database, user, password };
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.error('Connection failed:', err.message);
        res.status(401).json({ success: false, message: 'Datos incorrectos o conexión fallida.' });
    }
}));
router.get('/config', (req, res) => {
    if (dbConfig) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(403).json({ success: false });
    }
});
