import Link from "next/link";

export default function Register() {
    return (
        <div className="mx-auto max-w-screen-lg min-h-screen">
            <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
                <Link href={"/pages/register/barberShop"} className="py-2"> Cadastrar Barbearia </Link>
                <Link href={"/pages/register/barber"} className="py-2">Cadastrar Barbeiro</Link>
            </div>
        </div>
    );
};