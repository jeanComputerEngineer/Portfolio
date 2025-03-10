// utils/csrfFetch.ts
export async function csrfFetch(url: string, options: RequestInit = {}) {
    // Obtém o token CSRF via endpoint (que pode ser armazenado em um cookie ou retornado na resposta)
    const tokenResponse = await fetch("https://backchat.jeanhenrique.site/api/csrf-token", {
        credentials: 'include'
    });
    const { csrfToken } = await tokenResponse.json();

    options.credentials = 'include'; // importante para enviar os cookies httpOnly

    options.headers = {
        ...(options.headers || {}),
        "X-CSRF-Token": csrfToken
        // Não precisamos incluir o token de autenticação aqui, pois ele está em um cookie httpOnly
    };

    return fetch(url, options);
}
