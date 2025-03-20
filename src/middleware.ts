// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Rutas a proteger
  const protectedPaths = ["/my-account", "/checkout"];
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // Verificar cookie
    const token = req.cookies.get("token");
    if (!token) {
      // Redirigir a login
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  return NextResponse.next();
}
