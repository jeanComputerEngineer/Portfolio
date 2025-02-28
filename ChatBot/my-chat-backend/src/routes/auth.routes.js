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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var account_model_1 = require("../models/account.model");
var router = (0, express_1.Router)();
// Helper para lidar com async/await
var asyncHandler = function (fn) { return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
}; };
// Rota de registro
router.post("/register", asyncHandler(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, preferredLanguage, existing, newUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, name = _a.name, preferredLanguage = _a.preferredLanguage;
                return [4 /*yield*/, account_model_1.Account.findOne({ email: email })];
            case 1:
                existing = _b.sent();
                if (existing) {
                    return [2 /*return*/, res.status(400).json({ message: "E-mail já cadastrado." })];
                }
                newUser = new account_model_1.Account({ email: email, password: password, name: name, preferredLanguage: preferredLanguage });
                return [4 /*yield*/, newUser.save()];
            case 2:
                _b.sent();
                console.log("Usuário criado:", newUser);
                return [2 /*return*/, res.json({ message: "Usuário registrado com sucesso." })];
        }
    });
}); }));
// Rota de login (sem 2FA): se as credenciais forem válidas, o usuário é logado imediatamente.
router.post("/login", function (req, res, next) {
    passport_1.default.authenticate("local", function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({
                message: "Login bem-sucedido",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    preferredLanguage: user.preferredLanguage,
                },
            });
        });
    })(req, res, next);
});
// Rota para atualizar a conta
router.put("/account", function (req, res, next) {
    if (!req.user) {
        return;
    }
    var _a = req.body, name = _a.name, preferredLanguage = _a.preferredLanguage;
    account_model_1.Account.findByIdAndUpdate(req.user._id, { name: name, preferredLanguage: preferredLanguage }, { new: true })
        .then(function (user) { return res.json({ message: "Conta atualizada", user: user }); })
        .catch(function (err) { return res.status(500).json({ message: "Erro ao atualizar conta" }); });
});
// Rota para excluir a conta
router.delete("/account", function (req, res, next) {
    if (!req.user) {
        return;
    }
    account_model_1.Account.findByIdAndDelete(req.user._id)
        .then(function () { return res.json({ message: "Conta excluída" }); })
        .catch(function (err) { return res.status(500).json({ message: "Erro ao excluir conta" }); });
});
exports.default = router;
