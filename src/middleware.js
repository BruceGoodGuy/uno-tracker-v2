import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = request.cookies.get("session_token");
  console.log("Middleware token:", token);
  if (token && token.value) {
    try {
      const data = await fetch(`${process.env.BACKEND_URL}/auth/check`, {
        method: "GET",
        headers: { Cookie: `session_token=${token.value}` },
        cache: "no-store",
      });
      if (!data.ok) {
        console.error("Authentication check failed:", data.statusText);
        // If the token is invalid, redirect to the login page
        return NextResponse.redirect(new URL("/dev", request.url));
      } else {
        if (request.nextUrl.pathname === "/dev") {
          return NextResponse.redirect(new URL("/dev/auth", request.url));
        }
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/dev", request.url));
    }
  }
  
  return NextResponse.redirect(new URL("/dev", request.url));
}

export const config = {
  matcher: ["/dev/auth", "/dev/auth/:path*"],
};
