'use client';

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BarberServices {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function Services() {

    const [services, setServices] = useState<BarberServices[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBarberServices = async () => {
            try {
                const response = await axios.get('http://localhost:8800/barberservices');
                setServices(response.data);
            } catch (error) {
                console.error(error);
                setError('ocorreu um erro ao buscar os serviços.');
            } finally {
                setLoading(false);
            }
        };

        fetchBarberServices();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (

        <div className="min-h-screen">
            <div className="mx-auto max-w-screen-lg bg-blue-300">

                <Link href={"/"}>Voltar</Link>

                <h1 className="mx-auto w-32">Meus serviços</h1>

                <div className="grid grid-cols-3">
                    {services.map((service) => (
                        <div key={service.id} className="">
                            <p className="font-semibold text-lg">{service.name}</p>
                            <p className="text-gray-700">{service.description}</p>
                            <p className="font-medium text-green-600">{service.price}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}