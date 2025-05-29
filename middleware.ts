import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'; // Added import

export default clerkMiddleware();

// This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/dashboard', request.url)); // Added middleware function
// }

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    '/dashboard/:path*', // Added matcher for '/about/:path*'
  ],
};