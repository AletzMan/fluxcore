import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { getHomeRouteForRole } from './lib/utils/auth-utils';

interface JwtPayload {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    exp: number;
}


type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'PURCHASING_AGENT' | 'CASHIER' | 'STOCK_CLERK';

// ============================================
// CONFIGURACIÓN DE ACCESO POR RUTAS
// ============================================
const ROUTE_ACCESS: Record<string, UserRole[]> = {
    // Solo SUPER_ADMIN
    '/admin': ['SUPER_ADMIN'],
    '/admin/dashboard': ['SUPER_ADMIN'],
    '/admin/tenants': ['SUPER_ADMIN'],
    '/admin/plans': ['SUPER_ADMIN'],
    '/admin/subscriptions': ['SUPER_ADMIN'],
    '/admin/system-logs': ['SUPER_ADMIN'],
    '/admin/settings': ['SUPER_ADMIN'],

    // TENANT_ADMIN
    '/dashboard': ['ADMIN'],
    '/operaciones': ['ADMIN'],
    '/operaciones/ventas': ['ADMIN'],
    '/operaciones/caja': ['ADMIN'],
    '/catalogo': ['ADMIN'],
    '/catalogo/productos': ['ADMIN'],
    '/catalogo/categorias': ['ADMIN'],
    '/catalogo/marcas': ['ADMIN'],
    '/almacen': ['ADMIN'],
    '/almacen/inventario': ['ADMIN'],
    '/almacen/movimientos': ['ADMIN'],
    '/personas': ['ADMIN'],
    '/personas/clientes': ['ADMIN'],
    '/personas/proveedores': ['ADMIN'],
    '/personas/empleados': ['ADMIN'],
    '/control': ['ADMIN'],
    '/control/reportes': ['ADMIN'],
    '/control/configuracion': ['ADMIN'], 

    // Managers y superiores
    /*
    '/reportes': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    '/inventario': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    */

    // Todos los autenticados
    /*
    '/dashboard': ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'CASHIER'],
    '/ventas/pos': ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'CASHIER'],
    */
};

const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];

function decodeToken(token: string): JwtPayload | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp * 1000 < Date.now()) {
            return null;
        }
        return decoded;
    } catch {
        return null;
    }
}

function getUserRole(payload: JwtPayload): UserRole {
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as UserRole;
}


export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Identificar el estado de los tokens
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const accessToken = request.cookies.get('accessToken')?.value;

    // 2. Identificar el tipo de ruta
    const isAuthRoute = AUTH_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
    const isLandingPage = pathname === '/';
    const isPublicRoute = isAuthRoute || isLandingPage;

    // ============================================
    // CASO A: SI TIENE SESIÓN ACTIVA
    // ============================================
    if (refreshToken) {
        // A.1. Si intenta entrar a Login/Register -> Redirigir a su Home
        if (isAuthRoute) {
            let homeRoute = '/dashboard';
            if (accessToken) {
                const payload = decodeToken(accessToken);
                if (payload) homeRoute = getHomeRouteForRole(getUserRole(payload));
            }
            return NextResponse.redirect(new URL(homeRoute, request.url));
        }

        // A.2. Si es una ruta Privada (No pública), verificar Roles
        if (!isPublicRoute && accessToken) {
            const payload = decodeToken(accessToken);
            if (!payload) return NextResponse.next(); // Dejar que el cliente refresque el token

            const role = getUserRole(payload);

            // Verificar si la ruta específica está restringida
            const matchedRoute = Object.keys(ROUTE_ACCESS).find(route =>
                pathname === route || pathname.startsWith(route + '/')
            );

            if (matchedRoute) {
                const allowedRoles = ROUTE_ACCESS[matchedRoute];
                if (!allowedRoles.includes(role)) {
                    return NextResponse.redirect(new URL('/unauthorized', request.url));
                }
            }
        }
        // Si es la Landing ('/') o una ruta no configurada, permitir paso
        return NextResponse.next();
    }

    // ============================================
    // CASO B: SI NO TIENE SESIÓN
    // ============================================
    if (!isPublicRoute) {
        // Intenta entrar a algo privado sin sesión -> Login 
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // Es landing o login sin sesión -> Adelante
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};


/*import { NextResponse } from 'next/server';
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
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};*/