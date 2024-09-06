'use client'

import Link from "next/link";

export default function Hours() {
    return (
        <div className="w-screen min-h-screen bg-lime-500">
            <div className="mx-auto max-w-screen-lg bg-blue-300">
                <h1>Editar horario</h1>
                <Link href={"/pages/edit/servicesShop"}>Editar serviços</Link>
                <h1>Editar cadastro</h1>
                <Link href={"/"}>Voltar</Link>

                <div className="flex flex-row justify-center">

                    <form action="" className="flex flex-col items-center">
                        <div className="">Funcionamento Segunda-feira</div>
                        <div className="flex flex-row py-2">
                            <div className="flex flex-col mx-2">
                                <label htmlFor="segManha" className="block text-gray-500">Horário da manhã</label>
                                <input type="time" name="SegManha" id="segManha" required className="p-1" />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label htmlFor="segTarde" className="block text-gray-500">Horário da tarde</label>
                                <input type="time" name="SegTarde" id="segTarde" required className="p-1" />
                            </div>
                        </div>

                        <div className="">Funcionamento Terça-feira</div>
                        <div className="flex flex-row py-2">
                            <div className="flex flex-col mx-2">
                                <label htmlFor="terManha" className="block text-gray-500">Horário da manhã</label>
                                <input type="time" name="TerManha" id="terManha" required className="p-1" />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label htmlFor="terTarde" className="block text-gray-500">Horário da tarde</label>
                                <input type="time" name="TerTarde" id="terTarde" required className="p-1" />
                            </div>
                        </div>

                        <div className="">Funcionamento Quarta-feira</div>
                        <div className="flex flex-row py-2">
                            <div className="flex flex-col mx-2">
                                <label htmlFor="quaManha" className="block text-gray-500">Horário da manhã</label>
                                <input type="time" name="QuaManha" id="quaManha" required className="p-1" />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label htmlFor="quaTarde" className="block text-gray-500">Horário da tarde</label>
                                <input type="time" name="QuaTarde" id="quaTarde" required className="p-1" />
                            </div>
                        </div>

                        <div className="">Funcionamento Quinta-feira</div>
                        <div className="flex flex-row py-2">
                            <div className="flex flex-col mx-2">
                                <label htmlFor="quiManha" className="block text-gray-500">Horário da manhã</label>
                                <input type="time" name="QuiManha" id="quiManha" required className="p-1" />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label htmlFor="quiTarde" className="block text-gray-500">Horário da tarde</label>
                                <input type="time" name="QuiTarde" id="quiTarde" required className="p-1" />
                            </div>
                        </div>

                        <div className="">Funcionamento Sexta-feira</div>
                        <div className="flex flex-row py-2">
                            <div className="flex flex-col mx-2">
                                <label htmlFor="sexManha" className="block text-gray-500">Horário da manhã</label>
                                <input type="time" name="SexManha" id="sexManha" required className="p-1" />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label htmlFor="sexTarde" className="block text-gray-500">Horário da tarde</label>
                                <input type="time" name="SexTarde" id="sexTarde" required className="p-1" />
                            </div>
                        </div>

                        <div className="">Funcionamento Sábado</div>
                        <div className="flex flex-row py-2">
                            <div className="flex flex-col mx-2">
                                <label htmlFor="sabManha" className="block text-gray-500">Horário da manhã</label>
                                <input type="time" name="SabManha" id="sabManha" required className="p-1" />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label htmlFor="sabTarde" className="block text-gray-500">Horário da tarde</label>
                                <input type="time" name="SabTarde" id="sabTarde" required className="p-1" />
                            </div>
                        </div>

                        <div className="">Funcionamento Domingo</div>
                        <div className="flex flex-row py-2">
                            <div className="flex flex-col mx-2">
                                <label htmlFor="domManha" className="block text-gray-500">Horário da manhã</label>
                                <input type="time" name="DomManha" id="domManha" required className="p-1" />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label htmlFor="domTarde" className="block text-gray-500">Horário da tarde</label>
                                <input type="time" name="DomTarde" id="domTarde" required className="p-1" />
                            </div>
                        </div>

                        <input type="submit" value="Cadastrar Barbearia" />
                    </form>
                </div>
            </div>
        </div>
    );
}