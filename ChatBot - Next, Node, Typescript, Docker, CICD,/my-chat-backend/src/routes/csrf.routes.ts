import { Router, Request, Response } from "express";
const router = Router();

router.get("/csrf-token", (req: Request, res: Response) => {
    // O método req.csrfToken() é disponibilizado pelo middleware csurf
    res.json({ csrfToken: req.csrfToken() });
});

export default router;
