import Image from "next/image"
import { MdLogout } from "react-icons/md"
import { GiInjustice } from "react-icons/gi"
import { IoSearch } from "react-icons/io5"
import { IoMdTime } from "react-icons/io"
import { FaRegCalendar } from "react-icons/fa"
import Link from "next/link";

const columns = [
  { title: 'Nova Publicação', cards: [{ id: 1, text: '5018120-21.2021.8.13.0022', time: '3h', date: '21/10/2024' }] },
  { title: 'Publicação Lida', cards: [{ id: 2, text: '5018120-21.2021.8.13.0022', time: '30s', date: '21/10/2024' }] },
  { title: 'Enviar para Advogado Responsável', cards: [] },
  { title: 'Concluído', cards: [
    { id: 3, text: '5018120-21.2021.8.13.0022', time: '3h', date: '21/12/2023' },
    { id: 4, text: '5018120-21.2021.8.13.0022', time: '30d', date: '21/12/2023' },
    { id: 5, text: '5018120-21.2021.8.13.0022', time: '71d', date: '21/12/2023' },
  ] },
];

export default function KanbanPage() {
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
          {columns.map((col, index) => (
            <div key={index} className="bg-white shadow rounded p-4">
              <h2 className="mb-4 text-lg font-bold">{col.title}</h2>
              <div className="space-y-4">
                {col.cards.length === 0 && <p className="text-gray-400">Nenhum card encontrado</p>}
                {col.cards.map(card => (
                  <div key={card.id} className="p-4 bg-gray-50 border rounded shadow-sm">
                    <p>{card.text}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex"><IoMdTime size={20} style={{ marginRight: '5px' }} />{card.time}</span>
                      <span className="flex"><FaRegCalendar size={18} style={{ marginRight: '5px' }} />{card.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
