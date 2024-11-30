import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { idProcesso, idColuna, novaPosicao } = await req.json()

    await prisma.processo.update({
      where: { id: idProcesso },
      data: {
        colunaId: idColuna,
        posicao: novaPosicao,
      },
    })

    return NextResponse.json({ message: 'Processo atualizado com sucesso' })
    
  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: 'Erro ao atualizar o processo' },
      { status: 500 }
    )
  }
}
  