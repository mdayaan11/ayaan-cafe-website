import { auth } from './lib/auth';
import { NextResponse } from 'next/server';

// Define routes that require authentication
const protectedRoutes = [
  '/order', // Online Ordering System
  '/reservations', // Online Table Reservation System
  '/profile', // User profile/dashboard (common for authenticated users)
];

// Define routes that are part of the authentication flow (login, register)
// Logged-in users should be redirected away from these pages.
const authRoutes = [
  '/login',
  '/register',
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // `req.auth` is populated by NextAuth if the user is logged in

  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If an unauthenticated user tries to access a protected route, redirect to the login page.
  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL('/login', nextUrl.origin);
    // Add a callback URL so the user is redirected back to their intended page after successful login.
    redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If a logged-in user tries to access an authentication route (e.g., /login, /register),
  // redirect them to the home page or their profile.
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }

  // If none of the above conditions are met, continue to the requested page.
  return NextResponse.next();
});

// Configure the matcher to specify which paths the middleware should run on.
// This regex excludes Next.js internal paths, static files, and API routes,
// ensuring the middleware only runs on actual page requests.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
