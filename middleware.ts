import { NextResponse, type NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { guestRegex, isDevelopmentEnvironment } from './lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let Playwright ping pass through
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  // Let auth routes pass through
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // ❌ Skip token lookup and redirect logic
  // This avoids calling /api/auth/guest which is throwing 500 errors

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',
    '/login',
    '/register',
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
