'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-screen-lg min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
          <Link href={"/pages/login"} className="py-2"> login</Link>
          <Link href={"/pages/register"} className="py-2"> Cadastrar Barbearia </Link>
          <Link href={"/pages/edit/barbers"} className="py-2">Editar Barberia</Link>
          <Link href={"/pages/listBarberShop"} className="py-2">Ver Barbearias</Link>
        </div>
      </div>
    </main>
  );
}
