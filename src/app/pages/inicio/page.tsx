'use client'

import { BookCheck, NotebookPen, NotebookText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-screen-lg min-h-screen">

        <h1 className="py-5">
          <div className="text-2xl">Olá <span className="text-amber-400">(nome da conta)</span>, seja bem-vindo de volta!</div>
        </h1>
        <div className="flex flex-row h-[85vh] py-3">

          <div className="flex flex-col w-1/2 h-full space-y-3">
            <Link href={"/pages/register"} className="bg-lime-500 rounded-3xl w-4/5 h-1/5 py-3">
              <div className="text-center h-full">
                <div className="h-3/4"><NotebookText className="w-full h-full" /></div>
                <p className="py-2">Cadastrar Barberia</p>
              </div>
            </Link>
            <Link href={"/pages/edit/barbers"} className="bg-lime-500 rounded-3xl w-4/5 h-1/5 py-3">
              <div className="text-center h-full">
                <div className="h-3/4"><NotebookPen className="w-full h-full" /></div>
                <p className="py-2">Editar Barberia</p>
              </div>
            </Link>
            <Link href={"/pages/listBarberShop"} className="bg-lime-500 rounded-3xl w-4/5 h-1/5 py-3">
              <div className="text-center h-full">
                <div className="h-3/4"><BookCheck className="w-full h-full" /></div>
                <p className="py-2">Ver Barbearias</p>
              </div>
            </Link>
          </div>
          
          <div className="bg-lime-500 w-full h-2/3 rounded-3xl text-center"> imagem ou logo da barbearia</div>

        </div>
      </div>
    </main>
  );
}


