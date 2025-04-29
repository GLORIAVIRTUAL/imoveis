// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, verifyAuth } from './lib/auth';

import { cookies } from 'next/headers'; // Import cookies helper

// Paths that require authentication
const protectedPaths = [
  '/admin',
  '/cadastrar-imovel',
  '/meu-perfil', // Assuming a profile page exists or will be created
  '/meus-imoveis', // Assuming a page for user's properties exists
  '/contratos/gerar',
  '/servicos/avaliacao-imoveis', // Maybe allow anonymous, but require login for tracking?
  '/servicos/consulta-cpf',
  '/servicos/analise-contratos',
  '/servicos/cartorio-24h',
  '/servicos/prefeitura-24h',
];

// Paths that require admin privileges (subset of protectedPaths)
const adminPaths = [
  '/admin',
];

// API paths that require authentication
const protectedApiPaths = [
  '/api/users/me',
  '/api/properties', // POST, PUT, DELETE methods might require auth
  '/api/properties/[id]', // PUT, DELETE methods might require auth
  '/api/admin',
  '/api/contracts/generate',
  '/api/services/avaliacao',
  '/api/services/consulta-cpf',
  '/api/services/analise-contratos',
  '/api/services/cartorio',
  '/api/services/prefeitura',
  '/api/payments/redirect', // Might need auth to associate payment with user
  '/api/admin/uploads',
];

// API paths that require admin privileges
const adminApiPaths = [
  '/api/admin',
];

export async function middleware(request: NextRequest) {
  console.log(`[Middleware] Request for: ${request.nextUrl.pathname}`);
  const { pathname } = request.nextUrl;
  
  // Log incoming cookies
  const authTokenCookie = request.cookies.get("auth_token");
  console.log(`[Middleware] Auth token cookie present: ${!!authTokenCookie}`);
  if (authTokenCookie) {
    console.log(`[Middleware] Auth token value (first 10 chars): ${authTokenCookie.value.substring(0, 10)}...`);
  }

  const { isAuth, userId } = await verifyAuth(request);
  console.log(`[Middleware] verifyAuth result: isAuth=${isAuth}, userId=${userId}`);

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path));
  const isProtectedApiPath = protectedApiPaths.some(path => pathname.startsWith(path));
  const isAdminApiPath = adminApiPaths.some(path => pathname.startsWith(path));

  // --- Page Protection ---
  if (isProtectedPath || isAdminPath) {
    if (!isAuth) {
      // Not authenticated, redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      // Clear potentially invalid cookie if redirecting
      response.cookies.delete("auth_token"); 
      return response;
    }

    // Check admin privileges if required
    if (isAdminPath) {
      // TODO: Implement admin role check based on userId
      const isAdmin = false; // Placeholder
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // User is authenticated and has necessary privileges
    return NextResponse.next();
  }

  // --- API Protection ---
  if (isProtectedApiPath || isAdminApiPath) {
    if (!isAuth) {
      return NextResponse.json({ error: "Não autorizado: Token inválido ou não fornecido" }, { status: 401 });
    }

    // Check admin privileges if required for API
    if (isAdminApiPath) {
      // TODO: Implement admin role check based on userId
      const isAdmin = false; // Placeholder
      if (!isAdmin) {
        return NextResponse.json({ error: "Não autorizado: Acesso restrito a administradores" }, { status: 403 });
      }
    }

    // Add user ID to request headers for API routes to use
    const requestHeaders = new Headers(request.headers);
    if (userId) { // Ensure userId is available before setting header
        requestHeaders.set("X-User-Id", userId);
    }

    // User is authenticated for API access
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Allow request to proceed if not a protected path
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  runtime: 'nodejs', // Specify Node.js runtime
  matcher: [
    // Pages
    '/admin/:path*',
    '/cadastrar-imovel/:path*',
    '/meu-perfil/:path*',
    '/meus-imoveis/:path*',
    '/contratos/gerar/:path*',
    '/servicos/:path*',
    // APIs
    '/api/users/me/:path*',
    '/api/properties/:path*',
    '/api/admin/:path*',
    '/api/contracts/:path*',
    '/api/services/:path*',
    '/api/payments/:path*',
  ],
};

