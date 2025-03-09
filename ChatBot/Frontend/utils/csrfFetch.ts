export async function csrfFetch(url: string, options: RequestInit = {}) {
    // Obtenha o token CSRF
    const tokenResponse = await fetch("https://backchat.jeanhenrique.site/api/csrf-token", {
        credentials: 'include'
    });
    const { csrfToken } = await tokenResponse.json();

    // Certifica que as credenciais serão incluídas
    options.credentials = 'include';

    // Leia o token JWT armazenado (caso exista)
    const jwtToken = localStorage.getItem("token");

    options.headers = {
        ...(options.headers || {}),
        "X-CSRF-Token": csrfToken,
        ...(jwtToken ? { "Authorization": `Bearer ${jwtToken}` } : {})
    };

    return fetch(url, options);
}
