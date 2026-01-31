import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Si no hay refreshToken y no es ruta pública → login
    if (!refreshToken && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Si hay refreshToken y está en login/register → dashboard
    if (refreshToken && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};