import { House } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = async () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    const res = await fetch('minhaAPI', {
        method: 'POST',
        headers: {
            'Contente-type': 'aplication/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        router.push('/dashboard')
    } else {
        alert('login falhou, tente novamente.')
    }

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
                                            type="text"
                                            placeholder="Email"
                                            className="w-full my-1 px-2 rounded-full"
                                            value={email} // Ligando o valor ao estado de email
                                            onChange={(e) => setEmail(e.target.value)} // Atualizando o estado de email
                                            required
                                        />
                                        <input
                                            type="password" // Alterei para password para esconder os caracteres
                                            placeholder="Senha"
                                            className="w-full my-1 px-2 rounded-full"
                                            value={password} // Ligando o valor ao estado de senha
                                            onChange={(e) => setPassword(e.target.value)} // Atualizando o estado de senha
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col items-end justify-end w-full px-3">
                                        <button type="submit" className="w/1/4 rounded-full px-2 py-1 text-white bg-amber-600">Entrar</button>
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