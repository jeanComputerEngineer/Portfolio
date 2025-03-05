// src/utils/csrfFetch.ts
export async function csrfFetch(url: string, options: RequestInit = {}) {
    // Obtenha o token CSRF usando o fetch nativo
    const tokenResponse = await fetch("https://backchat.jeanhenrique.site/api/csrf-token", {
        credentials: 'include'
    });
    const { csrfToken } = await tokenResponse.json();

    // Assegure que as credenciais sejam incluídas
    options.credentials = 'include';

    // Mescla o header existente com o token CSRF
    options.headers = {
        ...(options.headers || {}),
        "X-CSRF-Token": csrfToken,
    };

    return fetch(url, options);
}
