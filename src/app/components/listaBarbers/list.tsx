import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Barbershop {
    id: number;
    name: string;
    image: string;
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

    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:8800/barbershops/${id}`);
            console.log('Resposta do servidor:', response.data);
            setBarbershops((prevBarbershops) =>
                prevBarbershops.filter(barbershop => barbershop.id !== id)
            );
        } catch (error) {
            console.error('Erro ao excluir:', error);
            setError('Ocorreu um erro ao excluir a barbearia.');
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
        <div className="w-full">
            <Link href="/">voltar ao inicio</Link>
            <h1 className="py-3 text-lg font-semibold text-center">Lista de Barbearias</h1>
            <ul>
                {barbershops.map((barbershop) => (
                    <li key={barbershop.id} className='py-4'>
                        <div className='flex flex-col space-y-1'>
                            <div className="flex flex-row items-start">
                                <Image src={barbershop.image}
                                    alt={`logo da barbearia ${barbershop.name}`}
                                    width={70} height={70} className='w-1/6 h-1/6 bg-lime-500' />
                                <div className='font-semibold'>
                                    Barber Shop:
                                    <div className='font-normal'>{barbershop.name}</div>
                                </div>
                                <button className='flex flex-row justify-end w-full' onClick={() => handleDelete(barbershop.id)}>
                                    del
                                </button>
                            </div>
                            (ID: {barbershop.id})
                        </div>
                    </li>
                ))}
            </ul>
            <BarbershopForm />
        </div>
    );
}

function BarbershopForm() {
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
            const response = await axios.post('http://localhost:8800/barbershops', {
                name,
                address,
                phones,       // Certifique-se de que o backend espera esse campo
                description,
                imageUrl      // Enviar o campo imageUrl, caso seja necessário
            });

            console.log(response.data);
            setSuccess(true);
            // Limpar os campos após o sucesso
            setName('');
            setAddress('');
            setPhones('');
            setDescription('');
            setImageUrl('');
        } catch (error) {
            console.error(error);
            setError('Erro ao criar barbearia.');
        }
    };

    return (
        <div>
            <h1 className="py-3 text-lg font-semibold text-center">Cadastrar Barbearia</h1>
            <form onSubmit={handleSubmit}>
                <div className="py-2">
                    <label htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="py-2">
                    <label htmlFor="address">Endereço:</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="py-2">
                    <label htmlFor="phones">Telefone:</label> {/* Alterado para 'phones' */}
                    <input
                        id="phones"
                        type="text"
                        value={phones}
                        onChange={(e) => setPhones(e.target.value)}
                        required
                    />
                </div>
                <div className="py-2">
                    <label htmlFor="description">Descrição:</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="py-2">
                    <label htmlFor="imageUrl">URL da Imagem (opcional):</label> {/* Novo campo imageUrl */}
                    <input
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
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
