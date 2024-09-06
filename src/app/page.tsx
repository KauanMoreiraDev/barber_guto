'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-screen-lg min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
          <Link href={"/pages/register"} className="py-2"> Cadastrar Barbearia </Link>
          <Link href={"/pages/edit/hours"} className="py-2">Editar Barberia</Link>
        </div>
      </div>
    </main>
  );
}
