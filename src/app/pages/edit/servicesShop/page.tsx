'use client';

import Link from "next/link";

export default function Services() {
    return (

        <div className="w-screen min-h-screen bg-lime-500">
            <div className="mx-auto max-w-screen-lg bg-blue-300">

                <h1>Editar Serviços</h1>
                <Link href={"/pages/edit/hours"}>Editar horario</Link>
                <h1>Editar cadastro</h1>
                <Link href={"/"}>Voltar</Link>

                <form action="" className="flex flex-col items-center justify-center h-screen">
                    <div className="py-2"> Nome</div>
                    <input name="Nome" id="register" type="text" placeholder="digite o nome" className="w-1/2 p-1"></input>
                    <div className="py-2">Descrição</div>
                    <input name="descrição" id="register" type="text" placeholder="digite a descrição" className="w-1/2 p-1"></input>
                    <div className="py-2">Preço</div>
                    <input name="Preço" id="register" type="number" placeholder="digite o preço" className="w-1/2 p-1"></input>
                    <div className="py-2">Image</div>
                    <input name="Image" id="register" type="image" placeholder="insira a iamgem" className="w-1/2 p-1"></input>

                    <input type="button" value={"Cadastrar Barbearia"} />
                </form>
            </div>
        </div>
    );
}