'use client'

import Image from "next/image"
import { MdLogout } from "react-icons/md"
import { GiInjustice } from "react-icons/gi"
import { IoSearch } from "react-icons/io5"
import { IoMdTime } from "react-icons/io"
import { FaRegCalendar } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

export default function KanbanPage() {
  const [dados, setDados] = useState([
    {
      id: "0",
      titulo: 'Nova Publicação',
      cards: [
        {
          id: "0",
          numero: "5018120-21.2021.8.13.0022",
          hora: '3h',
          data: '21/10/2024',
        },
        {
          id: "1",
          numero: "Numero do processo",
          hora: '30s',
          data: '21/10/2024',
        },
        {
          id: "2",
          numero: "Numero desconhecido",
          hora: '30d',
          data: '21/10/2024',
        },
      ],
    },
    {
      id: "1",
      titulo: 'Publicação Lida',
      cards: [
        {
          id: "3",
          numero: "5018120-21.2021.8.13.0022",
          hora: '3h',
          data: '21/10/2024',
        },
        {
          id: "4",
          numero: "Numero do processo",
          hora: '30s',
          data: '21/10/2024',
        },
        {
          id: "5",
          numero: "Numero desconhecido",
          hora: '30d',
          data: '21/10/2024',
        },
      ],
    },
    {
      id: "2",
      titulo: 'Enviar para Advogado Responsável',
      cards: [
      ],
    },
    {
      id: "3",
      titulo: 'Concluído',
      cards: [
        {
          id: "6",
          numero: "5018120-21.2021.8.13.0022",
          hora: '3h',
          data: '21/10/2024',
        },
        {
          id: "7",
          numero: "Numero do processo",
          hora: '30s',
          data: '21/10/2024',
        },
        {
          id: "8",
          numero: "Numero desconhecido",
          hora: '30d',
          data: '21/10/2024',
        },
      ],
    },
  ])

  async function onDragEnd(result: any) {
    const { source, destination } = result;

    if (destination) {
      const sInd = +source.droppableId;
      const dInd = +destination.droppableId;
      const items = Array.from(dados)

      if (sInd === dInd) {
        const [target] = items[sInd].cards.splice(source.index, 1)
        items[sInd].cards.splice(destination.index, 0, target)
  
        setDados(items)
      } else {
        const [target] = items[sInd].cards.splice(source.index, 1)
        items[dInd].cards.splice(destination.index, 0, target)

        setDados(items)
      }
    }
  }

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
                        {coluna.cards.length === 0 && <p className="text-gray-400">Nenhum card encontrado</p>}
                        {coluna.cards.map((card, i) => (
                          <Draggable key={card.id} draggableId={card.id} index={i}>
                            {(provided) => (
                              <div className="p-4 bg-gray-50 border rounded shadow-sm" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <p>{card.numero}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  <span className="flex"><IoMdTime size={20} style={{ marginRight: '5px' }} />{card.hora}</span>
                                  <span className="flex"><FaRegCalendar size={18} style={{ marginRight: '5px' }} />{card.data}</span>
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
