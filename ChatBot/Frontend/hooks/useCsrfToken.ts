import { useState, useEffect } from "react";

export function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/csrf-token", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setCsrfToken(data.csrfToken))
            .catch((err) => console.error("Erro ao buscar CSRF token:", err));
    }, []);

    return csrfToken;
}
