import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin authentication token
    const adminAuth = request.cookies.get('adminAuth');
    const adminUser = request.cookies.get('adminUser');
    
    if (!adminAuth || adminAuth.value !== 'true' || !adminUser) {
      // Redirect to admin login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify session data
    try {
      const userData = JSON.parse(decodeURIComponent(adminUser.value));
      const loginTime = new Date(userData.loginTime);
      const now = new Date();
      const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      // Session expires after 24 hours
      if (hoursSinceLogin > 24) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('expired', 'true');
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // Invalid session data
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('invalid', 'true');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
