'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Pencil } from 'lucide-react';
import BarbershopForm from '../register/page';

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
    const [editingBarbershop, setEditingBarbershop] = useState<Barbershop | null>(null);

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

    useEffect(() => {
        fetchBarbershops();
    }, []);

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8800/barbershops/${id}`);
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

    const handleEdit = (barbershop: Barbershop) => {
        setEditingBarbershop(barbershop);
    };

    const handleUpdate = async () => {
        setEditingBarbershop(null);
        await fetchBarbershops(); // Recarregar a lista de barbearias após a atualização
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
            {editingBarbershop ? (
                <BarbershopForm
                    barbershop={editingBarbershop}
                    onUpdate={handleUpdate}
                />
            ) : (
                <ul>
                    {barbershops.map((barbershop) => (
                        <li key={barbershop.id} className='py-4'>
                            <div className='flex flex-col space-y-1'>
                                <div className="flex flex-row items-start">
                                    <Image src={"/favicon.ico"}
                                        alt={`logo da barbearia ${barbershop.name}`}
                                        width={70} height={70} className='w-1/6 h-1/6 bg-lime-500' />
                                    <div className='font-semibold w-1/2'>
                                        Barber Shop:
                                        <div className='font-normal'>{barbershop.name}</div>
                                    </div>
                                    <div className="flex flex-row justify-end w-full"></div>
                                    <button className='px-1' onClick={() => handleDelete(barbershop.id)}>
                                        <Trash2 />
                                    </button>
                                    <button className='px-1' onClick={() => handleEdit(barbershop)}>
                                        <Pencil />
                                    </button>
                                </div>
                                (ID: {barbershop.id})
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BarbershopList;