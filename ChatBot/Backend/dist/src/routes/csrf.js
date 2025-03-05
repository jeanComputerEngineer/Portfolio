"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exemplo em src/routes/csrf.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/csrf-token', (req, res) => {
    // req.csrfToken() está disponível pois você já aplicou o middleware csurf
    res.json({ csrfToken: req.csrfToken() });
});
exports.default = router;
