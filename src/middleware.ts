import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    // Firebase Auth is handled client-side, no server-side session needed
    // This middleware can be used for route protection if needed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
