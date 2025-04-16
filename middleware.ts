import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { redisClient } from './lib/redis';
import { memoryStorage } from './lib/memory';

export async function middleware(request: NextRequest) {
  // 获取当前路径
  const path = request.nextUrl.pathname;

  // 不需要验证的路径
  const publicPaths = [
    '/login',
    '/_next',
    '/api/auth',
    '/favicon.ico',
  ];

  // 检查是否是公开路径
  const isPublicPath = publicPaths.some(publicPath =>
    path.startsWith(publicPath)
  );

  if (!isPublicPath) {
    // 获取auth cookie
    const auth = request.cookies.get('auth');

    // 如果没有auth cookie或cookie值不符合MD5格式（32位十六进制字符），重定向到登录页
    if (!auth?.value) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // 从cookie中提取username
    const username = request.cookies.get('username')?.value;
    if (!username) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // 从Redis中获取token
    const redisToken = await memoryStorage.get(username);
    console.log('redisToken', redisToken, username);
    if (!redisToken || redisToken !== auth.value) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 配置需要进行中间件处理的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};