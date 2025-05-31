import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  console.log('Middleware ejecutado:', req.nextUrl.pathname);

  const protectedPaths = ['/my-account', '/checkout'];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      console.log('No hay token, redirigiendo a /signin');
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {
      const decoded = jwt.decode(token) as JwtPayload | null;

      if (!decoded || !decoded.exp) {
        console.log(
          'Token inválido (no tiene expiración), redirigiendo a /signin'
        );
        const response = NextResponse.redirect(new URL('/signin', req.url));
        response.cookies.delete('token');
        return response;
      }

      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        console.log('Token expirado, redirigiendo a /signin');
        const response = NextResponse.redirect(new URL('/signin', req.url));
        response.cookies.delete('token');
        return response;
      }

      console.log(
        'Token válido para usuario:',
        decoded.email || decoded.sub || decoded.id || 'usuario'
      );
      console.log(
        'Token expira en:',
        new Date(decoded.exp * 1000).toISOString()
      );
    } catch (error) {
      console.log('Error al procesar el token:', error);
      const response = NextResponse.redirect(new URL('/signin', req.url));
      response.cookies.delete('token');
      return response;
    }
  }

  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/my-account/:path*',
    '/checkout/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
