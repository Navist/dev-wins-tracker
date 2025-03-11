import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    console.log("Middleware Running - Cookies:", req.cookies.getAll()); // Debugging

    const token = req.cookies.get("token"); // Read token from cookies
    console.log("Token Found in Middleware:", token);

    if (!token) {
        return NextResponse.redirect(new URL("/users/login", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
