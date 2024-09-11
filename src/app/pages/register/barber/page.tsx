'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeft, Check, X } from 'lucide-react';

function BarberForm() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phones, setPhones] = useState(''); // Alterado de 'phone' para 'phones'
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Adicionado campo imageUrl
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await axios.post(`https://backend-barber.vercel.app/barbershops/`, {
                name,
                address,
                phones,
                description,
                imageUrl
            });

            setSuccess(true);
            // Limpar os campos após o sucesso
            setName('');
            setAddress('');
            setPhones('');
            setDescription('');
            setImageUrl('');

        } catch (error) {
            console.error(error);
            setError('Erro ao cadastrar barbearia.');
        }
    };

    return (
        <div>
            <Link href={'/'}><ArrowLeft /></Link>
            <h1 className="py-3 text-lg font-semibold text-center">Cadastrar Funcionario</h1>
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
                    className={`relative w-1/6 h-full p-2 rounded-full font-semibold transition-all duration-1000 ease-in-out 
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

export default BarberForm;