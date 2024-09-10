'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Pencil } from 'lucide-react';

interface Barbershop {
    barberid: string;
    barbername: string;
    barberwhatsapp: string;
    barberemail: string;
}

interface BarberListProps {
    id: string;
}

function BarberList({ id } : BarberListProps) {
    const [barber, setBarber] = useState<Barbershop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBarber = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/barber/e4ec33a5-6690-40d1-91f5-f7e43150dc8c`);
            setBarber(response.data);
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro ao buscar os funcionários.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarber();
    }, []);

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8800/barber/e4ec33a5-6690-40d1-91f5-f7e43150dc8c`);
            setBarber((prevBarber) =>
                prevBarber.filter(barbershop => barbershop.barberid !== id)
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
            <h1 className="py-3 text-lg font-semibold text-center">Lista de Barbeiros</h1>
            <ul>
                {barber.map((barber) => (
                    <li key={barber.barberid} className='py-4'>
                        <div className='flex flex-col space-y-1'>
                            <div className="flex flex-row items-start">
                                <Image src={"/favicon.ico"}
                                    alt={`logo da barbearia ${barber.barbername}`}
                                    width={70} height={70} className='w-[9%] h-full bg-lime-500' />
                                <div className="flex flex-col items-start w-full">
                                    <div className='font-semibold w-1/2 pl-2'>
                                        Barber Name:
                                        <div className='font-normal pl-7'>{barber.barbername}</div>
                                    </div>
                                    <div className="font-semibold w-full pl-2">
                                        Telefone:
                                        <div className='font-normal pl-7'>{barber.barberwhatsapp}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-end w-1/12"></div>
                                <button className='px-1' onClick={() => handleDelete(barber.barberid)}>
                                    <Trash2 />
                                </button>
                                <button className='px-1'>
                                    <Link href={`/edit/${barber.barberid}`}>
                                        <Pencil />
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BarberList;