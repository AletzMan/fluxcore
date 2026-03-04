import { NextResponse } from 'next/server';

/**
 * Route Handler: GET /api/auth/clear-session
 *
 * Se invoca cuando el refresh token ha expirado en un Server Component.
 * Los Route Handlers SÍ pueden modificar cookies, a diferencia de los Server Components.
 * Borra las cookies de autenticación y redirige al login.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const callbackUrl = searchParams.get('callbackUrl') || '/login';

    const response = NextResponse.redirect(new URL(callbackUrl, request.url));

    // Borrar cookies de autenticación
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
}
