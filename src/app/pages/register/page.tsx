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
    );
}