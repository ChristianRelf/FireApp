import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/posts/new', '/posts/edit'];

// Paths that should redirect to dashboard if user is authenticated
const authPaths = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // Check if the current path is an auth path
  const isAuthPath = authPaths.some(path => 
    pathname.startsWith(path)
  );

  // For now, we'll handle authentication on the client side
  // In a production app, you might want to verify JWT tokens here
  
  // Allow the request to continue
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
  ],
};