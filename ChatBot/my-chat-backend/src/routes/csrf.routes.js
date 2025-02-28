"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/csrf-token", function (req, res) {
    // O método req.csrfToken() é disponibilizado pelo middleware csurf
    res.json({ csrfToken: req.csrfToken() });
});
exports.default = router;
