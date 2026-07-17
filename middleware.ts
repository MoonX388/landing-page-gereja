// middleware.ts (Ditaruh di folder paling luar projek, sejajar dengan package.json)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const url = req.nextUrl;

  // 🛡️ 1. PROTEKSI ASET: Abaikan file internal Next.js & static files (.png, .css, .js, dll)
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.includes('.') ||
    url.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // 2. Deteksi jika diakses via domain utama atau localhost
  const isMainDomain = 
    hostname === 'gerejapintar.id' || 
    hostname === 'www.gerejapintar.id' || 
    hostname.startsWith('localhost:');

  if (isMainDomain) {
    return NextResponse.next();
  }

  // 3. Ekstraksi nama subdomain (Contoh: bethel.gerejapintar.id -> bethel)
  const subdomain = hostname.split('.')[0];

  if (subdomain === 'api' || subdomain === 'www') {
    return NextResponse.next();
  }

  // 4. Daftar rute publik yang tidak boleh dimasukkan ke dalam folder [id] dashboard
  const publicRoutes = ['/login', '/register', '/forgot-pwd', '/reset-pwd', '/verify-email', '/jemaat'];
  if (publicRoutes.some(route => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 🚀 5. REWRITE KILAT MENGGUNAKAN NEW URL (Standar Vercel Production)
  const targetPath = url.pathname === '/' ? '' : url.pathname;
  return NextResponse.rewrite(new URL(`/dashboard/${subdomain}${targetPath}`, req.url));
}

export const config = {
  // Jalankan middleware di semua rute kecuali yang dikecualikan di atas
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};