import { Router, Request, Response } from "express";
const router = Router();

router.get("/csrf-token", (req: Request, res: Response) => {
    // req.csrfToken() é gerado pelo middleware csurf
    res.json({ csrfToken: req.csrfToken() });
});

export default router;
