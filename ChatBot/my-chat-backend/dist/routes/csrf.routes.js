"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/csrf-token", (req, res) => {
    // req.csrfToken() é gerado pelo middleware csurf
    res.json({ csrfToken: req.csrfToken() });
});
exports.default = router;
