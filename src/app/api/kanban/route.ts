import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const coluna = await prisma.coluna.findMany({
        include: {
            processos: true,
        },
    })

    if (coluna) {
        return NextResponse.json(coluna)
    }
}