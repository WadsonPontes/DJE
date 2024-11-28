import { NextRequest, NextResponse } from "next/server"
import AuthService from "./services/auth-service"

export const config = {
    matcher: '/((?!_next/static|_next/image|image|favicon.ico).*)',
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