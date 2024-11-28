import AuthService from "@/services/auth-service"
import { NextResponse } from "next/server"

export async function GET(req: NextResponse) {
    await AuthService.destroySession()

    return NextResponse.redirect(new URL('/login', req.url))
}