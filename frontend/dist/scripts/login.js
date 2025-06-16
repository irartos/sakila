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
const form = document.getElementById('dbForm');
const errorDiv = document.getElementById('errorMessage');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const data = {
        host: document.getElementById('host').value,
        port: document.getElementById('port').value,
        database: document.getElementById('database').value,
        user: document.getElementById('user').value,
        password: document.getElementById('password').value
    };
    try {
        const response = yield fetch('/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = yield response.json();
        if (result.success) {
            sessionStorage.setItem('dbConnected', 'true');
            window.location.href = '/index.html';
        }
        else {
            throw new Error(result.message || 'Error de conexión');
        }
    }
    catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
    }
}));
