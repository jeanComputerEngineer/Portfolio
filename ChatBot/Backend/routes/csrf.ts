// Exemplo em src/routes/csrf.ts
import { Router } from 'express';
const router = Router();

router.get('/csrf-token', (req, res) => {
    // req.csrfToken() está disponível pois você já aplicou o middleware csurf
    res.json({ csrfToken: req.csrfToken() });
});

export default router;
