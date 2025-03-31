import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"; // Si usas JWT directamente

export function middleware(req: NextRequest) {
  console.log("Middleware ejecutado:", req.nextUrl.pathname);

  const protectedPaths = ["/my-account"];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.log("No hay token, redirigiendo a /signin");
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      const decoded: any = jwt.decode(token); // Decodificar sin verificar la firma
      console.log("Token decodificado:", decoded);
      if (!decoded || !decoded.exp) {
        console.log("Token inválido, redirigiendo a /signin");
        return NextResponse.redirect(new URL("/signin", req.url));
      }

      const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
     console.log("Token expira en:", new Date(decoded.exp).toISOString());
      if (decoded.exp < now) {
        console.log("Token expirado, redirigiendo a /signin");
        return NextResponse.redirect(new URL("/signin", req.url));
      }

      console.log("Token válido, permitiendo acceso");
    } catch (error) {
      console.log("Error al decodificar el token:", error);
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-account", "/checkout"],
};
