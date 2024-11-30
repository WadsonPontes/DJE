import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const colunas = await prisma.coluna.findMany({
      orderBy: {
        posicao: 'asc',
      },
      include: {
        processos: {
          orderBy: {
            posicao: 'asc',
          },
        },
      },
    });
  
    if (colunas) {
      return NextResponse.json(colunas);
    } else {
      return NextResponse.json({ message: "Nenhuma coluna encontrada" }, { status: 404 });
    }
}
  