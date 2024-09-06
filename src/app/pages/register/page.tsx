'use client'

import Link from "next/link";
import ListaBarber from "@/app/components/listaBarbers/list"


export default function Register() {
    return (

        <div className="bg-blue-400">
            <div className="mx-auto w-96">
                <ListaBarber></ListaBarber>
            </div>
        </div>

        // <div className="w-screen min-h-screen bg-lime-500">
        //     <div className="mx-auto max-w-screen-lg h-screen bg-blue-300">

        //             <Link href={"/"}>voltar</Link>
        //             <h1 className="mx-auto">Cadastro de Barbearia</h1>

        //             <form action="" className="flex flex-col items-center justify-center h-screen">
        //                 <div className="py-2"> Nome</div>
        //                 <input name="Nome" id="register" type="text" placeholder="digite o nome" className="w-1/2 p-1"></input>
        //                 <div className="py-2">Endereço</div>
        //                 <input name="Endereço" id="register" type="text" placeholder="digite o endereço" className="w-1/2 p-1"></input>
        //                 <div className="py-2">Telefone</div>
        //                 <input name="Telefone" id="register" type="tel" placeholder="digite o telefone" className="w-1/2 p-1"></input>
        //                 <div className="py-2">Descrição</div>
        //                 <input name="Descrição" id="register" type="text" placeholder="digite a descrição" className="w-1/2 p-1"></input>
        //                 <div className="py-2">Image</div>
        //                 <input name="Image" id="register" type="image" placeholder="digite o telefone" className="w-1/2 p-1"></input>

        //                 <input type="button" value={"Cadastrar Barbearia"} />
        //             </form>
        //         </div>
        // </div>
    );
}