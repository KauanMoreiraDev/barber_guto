'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Pencil } from 'lucide-react';

interface Barbershop {
    id: string;
    name: string;
    barberid: string;
    barbername: string;
    barberwhatsapp: string;
    barberemail: string;
}

function BarberList() {
    const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
    const [selectedBarbershopId, setSelectedBarbershopId] = useState<string | null>(null);
    const [barbers, setBarbers] = useState<Barbershop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch barbershops
    const fetchBarbershops = async () => {
        try {
            const response = await axios.get('http://localhost:8800/barbershops');
            setBarbershops(response.data);
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro ao buscar as barbearias.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch barbers for a selected barbershop
    const fetchBarbers = async (barbershopId: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8800/barber/${barbershopId}`);
            setBarbers(response.data);
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro ao buscar os barbeiros.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarbershops();
    }, []);

    // Handle barbershop selection and fetch barbers
    const handleSelectBarbershop = (barbershopId: string) => {
        setSelectedBarbershopId(barbershopId);
        fetchBarbers(barbershopId); // Fetch barbers when a barbershop is selected
    };

    // Handle deleting a barber
    const handleDeleteBarber = async (barberId: string) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8800/barber/${barberId}`);
            setBarbers((prevBarbers) =>
                prevBarbers.filter(barber => barber.barberid !== barberId)
            );
        } catch (error) {
            console.error('Erro ao excluir:', error);
            setError('Ocorreu um erro ao tentar excluir o funcionário.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="mx-auto max-w-screen-lg">
            <Link href="/"><ArrowLeft /></Link>
            <h1 className="py-3 text-lg font-semibold text-center">Selecione uma barbearia</h1>

            <ul>
                {barbershops.map((barbershop) => (
                    <li key={barbershop.id} className="py-4 cursor-pointer" onClick={() => handleSelectBarbershop(barbershop.id)}>
                        <div className="flex flex-row items-start">
                            <Image src={"/favicon.ico"}
                                alt={`logo da barbearia ${barbershop.name}`}
                                width={70} height={70} className="w-[9%] h-full bg-lime-500" />
                            <div className="flex flex-col items-start w-full">
                                <div className="font-semibold w-1/2 pl-2">
                                    Barber Shop:
                                    <div className="font-normal pl-7">{barbershop.name}</div>
                                </div>
                                <div className="font-semibold w-full pl-2">
                                    Id:
                                    <div className="font-normal pl-7">{barbershop.id}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedBarbershopId && (
                <>
                    <h1 className="py-3 text-lg font-semibold text-center">Lista de Barbeiros</h1>
                    <ul>
                        {barbers.map((barber) => (
                            <li key={barber.barberid} className="py-4">
                                <div className="flex flex-row items-start">
                                    <Image src={"/favicon.ico"}
                                        alt={`logo da barbearia ${barber.barbername}`}
                                        width={70} height={70} className="w-[9%] h-full bg-lime-500" />
                                    <div className="flex flex-col items-start w-full">
                                        <div className="font-semibold w-1/2 pl-2">
                                            Barber Name:
                                            <div className="font-normal pl-7">{barber.barbername}</div>
                                        </div>
                                        <div className="font-semibold w-full pl-2">
                                            Telefone:
                                            <div className="font-normal pl-7">{barber.barberwhatsapp}</div>
                                        </div>
                                    </div>
                                    <button className="px-1" onClick={() => handleDeleteBarber(barber.barberid)}>
                                        <Trash2 />
                                    </button>
                                    <button className="px-1">
                                        <Link href={`/edit/${barber.barberid}`}>
                                            <Pencil />
                                        </Link>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default BarberList;
