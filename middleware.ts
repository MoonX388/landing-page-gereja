import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const url = req.nextUrl;

  // 🛡️ 1. PROTEKSI ASET: Abaikan file internal Next.js & static files (.png, .css, dll)
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. DETEKSI DOMAIN UTAMA ATAU LOCALHOST
  const cleanHostname = hostname.split(':')[0].trim();
  const isMainDomain = 
    cleanHostname === 'gerejapintar.id' || 
    cleanHostname === 'www.gerejapintar.id' || 
    cleanHostname === 'localhost';

  if (isMainDomain) {
    // 🟢 AKSES LANGSUNG: Jika admin mengakses /dashboard di domain utama, jangan di-proxy/rewrite!
    if (url.pathname === '/dashboard' || url.pathname.startsWith('/dashboard/')) {
      return NextResponse.next();
    }
    return NextResponse.next();
  }

  // 3. EKSTRAKSI NAMA SUBDOMAIN (Multi-Tenant)
  const subdomain = cleanHostname.split('.')[0];
  if (!subdomain || subdomain === 'api' || subdomain === 'www') {
    return NextResponse.next();
  }

  // 4. DAFTAR RUTE PUBLIK GLOBAL
  const publicRoutes = ['/login', '/register', '/forgot-pwd', '/reset-pwd', '/verify-email', '/jemaat'];
  if (publicRoutes.some(route => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 🚀 5. REWRITE KILAT KE FOLDER DINAMIS [id] DASHBOARD
  const targetPath = url.pathname === '/' ? '' : url.pathname;
  return NextResponse.rewrite(new URL(`/dashboard/${subdomain}${targetPath}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};