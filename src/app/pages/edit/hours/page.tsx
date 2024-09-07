'use client'

import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface BarberSlots {
    id: number;
    barbershopId: number;
    timeId: number;
    date: number;
}

export default function Hours() {

    const [slots, setslots] = useState<BarberSlots[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBarberSlots = async () => {
            try {
                const response = await axios.get('http://localhost:8800/slots?barbershopId=c5aec86a-71a4-453f-8185-c86a1c8126bb&date=2024-09-02');
                setslots(response.data);
            } catch (error) {
                console.error(error);
                setError('ocorreu um erro ao buscar pelos agendamentos.');
            } finally {
                setLoading(false);
            }
        };

        fetchBarberSlots();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="w-screen min-h-screen bg-lime-500">
            <div className="mx-auto max-w-screen-lg bg-blue-300">
                <h1>Editar horario</h1>
                <Link href={"/pages/edit/servicesShop"}>Editar serviços</Link>
                <h1>Editar cadastro</h1>
                <Link href={"/"}>Voltar</Link>

                {slots.map((slots) => (
                    <div key={slots.barbershopId}>
                        <div className="py-2">
                            {slots.id}
                        </div>
                        <div className="py-2">
                            {slots.barbershopId}
                        </div>
                        <div className="py-2">
                            {slots.date}
                        </div>
                        <div className="py-2">
                            {slots.timeId}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}