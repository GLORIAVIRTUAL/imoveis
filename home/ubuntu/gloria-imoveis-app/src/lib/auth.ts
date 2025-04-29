// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
const TOKEN_EXPIRY = '7d'; // Token expira em 7 dias

// Gerar token JWT
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Verificar token JWT
export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Obter token do cabeçalho Authorization ou dos cookies
export function getTokenFromRequest(request: NextRequest | Request): string | null {
  // Tentar obter do cabeçalho Authorization
  const authHeader = request.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Tentar obter dos cookies (especificamente para NextRequest no middleware)
  if (request instanceof NextRequest) {
      const token = request.cookies.get("auth_token")?.value;
      if (token) {
          return token;
      }
  }
  // Nota: Se esta função for usada em Route Handlers ou Server Components,
  // pode ser necessário usar `cookies()` de `next/headers` nesses contextos.
  // A implementação atual prioriza o uso no middleware.

  return null;
}

// Verificar autenticação a partir de uma requisição
export async function verifyAuth(request: NextRequest | Request): Promise<{ isAuth: boolean; userId?: string }> {
  let token: string | undefined;

  // Tentar obter o token do objeto request (especialmente para NextRequest no middleware)
  if (request instanceof NextRequest) {
      token = request.cookies.get("auth_token")?.value;
  } else {
      // Fallback ou lógica alternativa se necessário, mas o middleware sempre passa NextRequest
  }

  if (!token) {
    return { isAuth: false };
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!decoded || !decoded.userId) {
      return { isAuth: false };
    }
    return { isAuth: true, userId: decoded.userId };
  } catch (error: any) {
    console.error("[verifyAuth] Token verification error:", error.message); // Manter log de erro real
    return { isAuth: false };
  }
}

// Definir cookie de autenticação
export function setAuthCookie(token: string): void {
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
    path: '/',
  });
}

// Remover cookie de autenticação
export function removeAuthCookie(): void {
  cookies().delete('auth_token');
}

