'use client'

import { House } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita o recarregamento da página

        try {
            const res = await fetch('http://localhost:8800/users/login', { // Altere a URL conforme sua API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Corrige o header
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Login bem-sucedido!", data);
                router.push('/pages/inicio'); // Redireciona para o dashboard
            } else {
                alert('Login falhou, tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição de login:', error);
            alert('Ocorreu um erro, tente novamente.');
        }
    };

    return (
        <div className="bg-amber-400 w-screen min-h-screen">
            <div className="mx-auto max-w-screen-lg h-full">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="bg-slate-200 w-full h-[70vh] rounded-3xl overflow-hidden relative">
                        <div className="bg-amber-600 absolute -top-16 -left-16 w-2/5 h-[130%] rotate-[15deg] z-30">
                            <div className="absolute top-12 left-24 -rotate-[15deg] h-full">
                                <div className="flex flex-col items-start justify-evenly h-4/5">
                                    <Link href={'/'}><House /></Link>
                                    <div className="text-xl font-semibold">
                                        Faça login para gerenciar sua barbearia!
                                    </div>
                                    <div className="">
                                        Não tem uma conta? <span className="text-amber-200 font-medium">crie agora</span>.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-20 flex flex-col items-end h-full">
                            <div className="w-3/5 h-full flex flex-col items-start justify-around">
                                <form onSubmit={handleSubmit} className="w-full max-w-md">
                                    <div className="w-full h-1/2 flex flex-col justify-end px-3">
                                        <input
                                            type="email" // Corrigido para 'email'
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} // Captura o valor do email
                                            className="w-full my-1 px-2 rounded-full"
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} // Captura o valor da senha
                                            className="w-full my-1 px-2 rounded-full"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col items-end justify-end w-full h-full px-3">
                                        <button type="submit" className="w-1/4 rounded-full px-2 py-1 text-white bg-amber-600">Entrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
