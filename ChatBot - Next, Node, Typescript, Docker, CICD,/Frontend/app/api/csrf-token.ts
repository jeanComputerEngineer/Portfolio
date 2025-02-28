// In your routes file (before any route that requires CSRF protection)
router.get("/csrf-token", (req: Request, res: Response) => {
    // req.csrfToken() is provided by csurf after the middleware is applied.
    res.json({ csrfToken: req.csrfToken() });
});
