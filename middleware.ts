import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    // Redirect from southernsweetandsour.com to licorice4good.com/shop
    const host = request.headers.get('host') || '';
    
    // Normalize host (remove port if present, handle www)
    const normalizedHost = host.split(':')[0].toLowerCase();
    
    // Only redirect when the host is southernsweetandsour.com (not localhost, not Vercel preview URLs)
    // Check if host matches the source domain (with or without www)
    if (
      normalizedHost === 'southernsweetandsour.com' || 
      normalizedHost === 'www.southernsweetandsour.com'
    ) {
      // Prevent redirect loops - check if we're already redirecting to the target
      const destination = 'https://licorice4good.com/shop';
      
      // Use 308 (permanent redirect) for SEO
      return NextResponse.redirect(destination, 308);
    }
  } catch (error) {
    // If redirect fails, continue with normal request handling
    console.error('Middleware redirect error:', error);
  }

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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};
