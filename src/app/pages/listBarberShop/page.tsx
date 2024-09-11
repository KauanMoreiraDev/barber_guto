'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Pencil } from 'lucide-react';

interface Barbershop {
    id: string;
    name: string;
    address: string;
    phones: string;
    description: string;
    imageUrl: string;
}

function BarbershopList() {
    const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBarbershops = async () => {
        try {
            const response = await axios.get('https://backend-barber.vercel.app/barbershops');
            setBarbershops(response.data);
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro ao buscar as barbearias.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarbershops();
    }, []);

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`https://backend-barber.vercel.app/barbershops/${id}`);
            setBarbershops((prevBarbershops) =>
                prevBarbershops.filter(barbershop => barbershop.id !== id)
            );
        } catch (error) {
            console.error('Erro ao excluir:', error);
            setError('Ocorreu um erro ao tentar excluir a barbearia.');
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
            <h1 className="py-3 text-lg font-semibold text-center">Lista de Barbearias</h1>
            <ul>
                {barbershops.map((barbershop) => (
                    <li key={barbershop.id} className='py-4'>
                        <div className='flex flex-col space-y-1'>
                            <div className="flex flex-row items-start">
                                <Image src={"/favicon.ico"}
                                    alt={`logo da barbearia ${barbershop.name}`}
                                    width={70} height={70} className='w-[9%] h-full bg-lime-500' />
                                <div className="flex flex-col items-start w-full">
                                    <div className='font-semibold w-1/2 pl-2'>
                                        Barber Shop:
                                        <div className='font-normal pl-7'>{barbershop.name}</div>
                                    </div>
                                    <div className="font-semibold w-full pl-2">
                                        Endereço:
                                        <div className='font-normal pl-7'>{barbershop.address}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-end w-1/12"></div>
                                <button className='px-1' onClick={() => handleDelete(barbershop.id)}>
                                    <Trash2 />
                                </button>
                                <button className='px-1'>
                                    <Link href={`/edit/${barbershop.id}`}>
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

export default BarbershopList;