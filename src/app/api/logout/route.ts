import AuthService from "@/services/auth-service"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    await AuthService.destroySession()

    return NextResponse.redirect(new URL('/login', req.url))
}