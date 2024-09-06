import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Barbershop {
    id: number;
    name: string;
}

function BarbershopList() {
    const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Para mostrar um indicador de carregamento
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBarbershops = async () => {
            try {
                const response = await axios.get('http://localhost:8800/barbershops');
                setBarbershops(response.data);
            } catch (error) {
                console.error(error);
                setError('Ocorreu um erro ao buscar as barbearias.');
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchBarbershops();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="w-full">
            <Link href="/">voltar ao inicio</Link>
            <h1 className="py-3 text-lg font-semibold text-center">Lista de Barbearias</h1>
            <ul>
                {barbershops.map((barbershop) => (
                    <li key={barbershop.id} className='py-1'>
                        {barbershop.name} <br/> (ID: {barbershop.id})
                    </li>
                ))}
            </ul>
            <BarbershopForm />
        </div>
    );
}

function BarbershopForm() {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('http://localhost:8800/barbershops', { name });
            console.log(response.data);
            setSuccess(true);
            setName('');
        } catch (error) {
            console.error(error);
            setError('Erro ao criar barbearia.');
        }
    };

    return (
        <div>
            <h1 className="py-3 text-lg font-semibold text-center">Cadastrar Barbearia</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Barbearia cadastrada com sucesso!</p>}
        </div>
    );
}

export default BarbershopList;
