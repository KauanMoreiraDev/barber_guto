'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeft, Check, X } from 'lucide-react';

interface Barbershop {
    id: string;
    name: string;
    address: string;
    phones: string;
    description: string;
    imageUrl: string;
}

function BarbershopForm({ barbershop, onUpdate }: { barbershop: Barbershop, onUpdate: () => void }) {
    const [name, setName] = useState(barbershop.name);
    const [address, setAddress] = useState(barbershop.address);
    const [phones, setPhones] = useState(barbershop.phones);
    const [description, setDescription] = useState(barbershop.description);
    const [imageUrl, setImageUrl] = useState(barbershop.imageUrl);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        setName(barbershop.name);
        setAddress(barbershop.address);
        setPhones(barbershop.phones);
        setDescription(barbershop.description);
        setImageUrl(barbershop.imageUrl);
    }, [barbershop]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await axios.put(`http://localhost:8800/barbershops/${barbershop.id}`, {
                name,
                address,
                phones,
                description,
                imageUrl
            });
            setSuccess(true);
            onUpdate(); // Notifica que a atualização foi realizada
        } catch (error) {
            console.error(error);
            setError('Erro ao atualizar a barbearia.');
        }
    };

    return (
        <div>
            <Link href={'/'}><ArrowLeft /></Link>
            <h1 className="py-3 text-lg font-semibold text-center">Cadastrar Barbearia</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className="py-2">
                    <input
                        id="name"
                        type="text"
                        value={name}
                        placeholder="Nome"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-full bg-slate-200 px-4 py-1"
                    />
                </div>
                <div className="py-2">
                    <input
                        id="address"
                        type="text"
                        value={address}
                        placeholder="Endereço"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="rounded-full bg-slate-200 px-4 py-1"
                    />
                </div>
                <div className="py-2">
                    <input
                        id="phones"
                        type="text"
                        value={phones}
                        placeholder="Telefone"
                        onChange={(e) => setPhones(e.target.value)}
                        required
                        className="rounded-full bg-slate-200 px-4 py-1"
                    />
                </div>
                <div className="py-2">
                    <input
                        id="whatsapp"
                        type="text"
                        value={phones}
                        placeholder="Whatsapp"
                        onChange={(e) => setPhones(e.target.value)}
                        className="rounded-full bg-slate-200 px-4 py-1"
                    />
                </div>
                <div className="py-2">
                    <input
                        id="description"
                        type="text"
                        value={description}
                        placeholder="Descrição Simples"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="rounded-full bg-slate-200 px-4 py-1"
                    />
                </div>
                <div className="py-2">
                    <input
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        placeholder="Logo"
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="rounded-full bg-slate-200 px-4 py-1"
                    />
                </div>
                <button
                    type="submit"
                    className={`relative w-1/2 h-full p-2 rounded-full font-semibold transition-all duration-1000 ease-in-out 
            ${error ? 'bg-red-500' : success ? 'bg-green-500' : 'bg-yellow-500'}`}
                >
                    {success ? (
                        <span className="flex items-center justify-center space-x-2">
                            <span className={`transition-opacity duration-1000 opacity-100 scale-100`}>
                                <Check className="w-6 h-6" />
                            </span>
                            <span>Cadastrado</span>
                        </span>
                    ) : error ? (
                        <span className="flex items-center justify-center space-x-2">
                            <span className={`transition-opacity duration-1000 opacity-100 scale-100`}>
                                <X className="w-6 h-6" />
                            </span>
                            <span>Houve um erro</span>
                        </span>
                    ) : (
                        'Cadastrar'
                    )}
                </button>
            </form>
        </div>
    );
}

export default BarbershopForm;
