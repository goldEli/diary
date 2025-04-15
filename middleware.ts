import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('auth');
  console.log("auth:",auth)
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!auth && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (auth && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};