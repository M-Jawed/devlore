import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/dashboard", "/bookmarks", "/posts", "/profile"];
const adminRoute = ["/admin"];

const proxy = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const protectedRoute = protectedRoutes?.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  const isAdmin = adminRoute?.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (protectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAdmin && session?.user.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default proxy;
