import { NextRequest, NextResponse } from "next/server"
import AuthService from "./services/auth-service"

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|logo.png|sitemap.xml|robots.txt).*)',
    ],
  }

const publicRoutes = ['/signup', '/login']
const privateRoutes = ['/kanban', '/api/logout']

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const session = await AuthService.isSessionValid()

    if (!session && !publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (session && !privateRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/kanban', req.url))
    }

    return NextResponse.next()
}