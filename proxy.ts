import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const role = req.cookies.get("role")?.value;

  if (
    req.nextUrl.pathname.startsWith("/restaurant") &&
    role !== "restaurant_owner"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/restaurant/:path*"],
};