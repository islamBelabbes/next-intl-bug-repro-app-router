import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix, defaultLocale } from "./navigation";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) return NextResponse.next();

  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: "en",
    localePrefix,
  });

  const response = handleI18nRouting(request);
  console.log({
    a: response.headers.get("Link"),
    b: response.headers.get("X-Middleware-Rewrite"),
  });

  return response;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(en|ar)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
