import AuthService from "@/services/auth-service"
import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { nome, email, senha, confirmarsenha } = body

    if (!nome) {
        return NextResponse.json({
            error: true,
            nome: 'Nome não pode estar vazio',
            status: 400
        })
    }

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
            senha: 'Senha não pode estar vazio',
            status: 400
        })
    }

    if (senha != confirmarsenha) {
        return NextResponse.json({
            error: true,
            confirmarsenha: 'Senhas não correspondem',
            status: 400
        })
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    })

    if (user) {
        return NextResponse.json({
            error: true,
            email: 'E-mail já registrado',
            status: 400
        })
    }

    const password = await bcrypt.hash(senha, 10)
    const name = nome

    await prisma.user.create({
        data: {
            email,
            password,
            name,
        }
    })

    return NextResponse.json({
        error: false,
        status: 200
    })
}