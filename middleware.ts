import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  const isMainDomain = 
    hostname === 'gerejapintar.id' || 
    hostname === 'www.gerejapintar.id' || 
    hostname.startsWith('localhost:');

  if (isMainDomain) return NextResponse.next();

  const subdomain = hostname.split('.')[0];
  if (subdomain === 'api' || subdomain === 'www') return NextResponse.next();

  if (url.pathname === '/') {
    url.pathname = `/dashboard/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  if (!url.pathname.startsWith('/dashboard')) {
    url.pathname = `/dashboard/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};