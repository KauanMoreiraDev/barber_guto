'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Check, X } from 'lucide-react';

function EditBarbershop() {
    const router = useRouter();
    const { id } = router.query; // Pega o 'id' da URL

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phones, setPhones] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        // Busca os dados da barbearia ao carregar a página
        if (id) {
            axios.get(`http://localhost:8800/barbershops/${id}`)
                .then(response => {
                    const { name, address, phones, description, imageUrl } = response.data;
                    setName(name);
                    setAddress(address);
                    setPhones(phones);
                    setDescription(description);
                    setImageUrl(imageUrl);
                })
                .catch(error => {
                    console.error('Erro ao buscar os dados:', error);
                    setError('Erro ao carregar os dados da barbearia.');
                });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await axios.put(`http://localhost:8800/barbershops/${id}`, {
                name,
                address,
                phones,
                description,
                imageUrl
            });

            setSuccess(true);
            // Redireciona para a página de lista após a edição
            router.push('/listbarber');
        } catch (error) {
            console.error(error);
            setError('Erro ao atualizar a barbearia.');
        }
    };

    return (
        <div>
            <Link href={'/listbarber'}><ArrowLeft /></Link>
            <h1 className="py-3 text-lg font-semibold text-center">Editar Barbearia</h1>
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
                            <span className="transition-opacity duration-1000 opacity-100 scale-100">
                                <Check className="w-6 h-6" />
                            </span>
                            <span>Editado</span>
                        </span>
                    ) : error ? (
                        <span className="flex items-center justify-center space-x-2">
                            <span className="transition-opacity duration-1000 opacity-100 scale-100">
                                <X className="w-6 h-6" />
                            </span>
                            <span>Erro</span>
                        </span>
                    ) : (
                        'Editar'
                    )}
                </button>
            </form>
        </div>
    );
}

export default EditBarbershop;
