'use client'

import Image from "next/image"
import { MdLogout } from "react-icons/md"
import { GiInjustice } from "react-icons/gi"
import { IoSearch } from "react-icons/io5"
import { IoMdTime } from "react-icons/io"
import { FaRegCalendar } from "react-icons/fa"
import Link from "next/link"
import { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Coluna, Processo } from '@prisma/client';
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function KanbanPage() {
  const [dados, setDados] = useState<(Coluna & { processos: Processo[] })[]>([]) // useState<Coluna[]>([])

  async function buscarDados() {
    const res = await fetch('/api/kanban', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const message = await res.json()

      setDados(message)
    }
  }

  async function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (destination) {
      const sInd = +source.droppableId;
      const dInd = +destination.droppableId;
      const items = Array.from(dados)

      const [target] = items[sInd].processos.splice(source.index, 1)
      items[dInd].processos.splice(destination.index, 0, target)

      target.posicao = (items[dInd].processos[Math.max(destination.index-1, 0)].posicao + items[dInd].processos[Math.min(destination.index+1, items[dInd].processos.length-1)].posicao) / 2

      setDados(items)

      const res = await fetch('/api/processo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idProcesso: target.id,
          idColuna: items[dInd].id,
          novaPosicao: target.posicao,
        }),
      })
    
      if (!res.ok) {
        console.error('Erro ao atualizar processo no backend:', await res.text())
      }
    }
  }

  useEffect(() => {
    buscarDados()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <Image
            src="/logo.png"
            alt="Logo"
            width={128}
            height={36}
            priority
          />
        <Link href="/api/logout"><button className="px-4 flex">
          <MdLogout size={24} style={{ marginRight: '5px' }} /> Sair
        </button></Link>
      </header>

      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="flex flex-1 px-4 py-2" style={{ fontSize: '1.8rem' }}>
            <GiInjustice size={32} style={{ marginRight: '10px', marginTop: '4px', color: '#333' }} />Publicações
          </h1>
          <div className="flex flex-1 flex-col">
            <label>Pesquisar</label>
            <input style={{ marginRight: '15px' }}
              type="text"
              placeholder="Digite o número do processo ou nome das partes envolvidas"
              className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label style={{ marginLeft: '32px' }}>Data do diário</label>
            <div className="flex items-center gap-2">
              <label style={{ color: '#777' }}>De:</label>
              <input
                type="date"
                className="px-4 py-2 border rounded shadow-sm focus:outline-none"
              />
              <label style={{ color: '#777' }}>Até:</label>
              <input
                type="date"
                className="px-4 py-2 border rounded shadow-sm focus:outline-none"
              />
              <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" style={{ marginLeft: '20px' }}>
                <IoSearch size={25} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
            <DragDropContext onDragEnd={onDragEnd}>
              {dados.map((coluna, index) => (
                <Droppable key={index} droppableId={`${index}`} type="list" direction="vertical">
                  {(provided) => (
                    <div className="bg-white shadow rounded p-4" style={{ minHeight: '72vh' }} ref={provided.innerRef} {...provided.droppableProps}>
                      <h2 className="mb-4 text-lg font-bold">{coluna.titulo}</h2>
                      <div className="space-y-4">
                        {coluna.processos.length === 0 && <p className="text-gray-400">Nenhum card encontrado</p>}
                        {coluna.processos.map((card, i) => (
                          <Draggable key={card.id} draggableId={card.id} index={i}>
                            {(provided) => (
                              <div className="p-4 bg-gray-50 border rounded shadow-sm" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <p>{card.numero}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  <span className="flex"><IoMdTime size={20} style={{ marginRight: '5px' }} />{formatDistanceToNow(card.dataAtualizacao, { addSuffix: true, locale: ptBR })}</span>
                                  <span className="flex"><FaRegCalendar size={18} style={{ marginRight: '5px' }} />{format(card.dataPublicacao, "dd/MM/yyyy")}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
        </div>
      </div>
    </div>
  );
}
