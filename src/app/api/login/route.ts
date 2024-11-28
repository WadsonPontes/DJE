import AuthService from "@/services/auth-service"
import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, senha } = body

    if (!email) {
        return NextResponse.json({
            error: true,
            email: 'E-mail não pode estar vazio',
            status: 400
        })
    }
    
    if (!senha) {
        return NextResponse.json({
            error: true,
            email: 'Senha não pode estar vazio',
            status: 400
        })
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    })

    if (user) {
        const isMatch = await bcrypt.compare(senha, user.password)

        if (isMatch) {
            await AuthService.createSessionToken({sub: user.id, name: user.name, email: user.email})

            return NextResponse.json({
                error: false,
                status: 200
            })
        }
    }

    return NextResponse.json({
        error: true,
        senha: 'Credenciais inválidas',
        status: 401
    })
}