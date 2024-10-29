'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaLock } from 'react-icons/fa';

export default function Assinatura() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssinar = () => {
    setIsSubmitting(true);
    // Redireciona para o link do Stripe
    window.location.href = 'https://buy.stripe.com/8wMaEIaVp2fO4o0000';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <Image
              src="/ft-icone.png"
              alt="Logo da Empresa"
              width={100}
              height={50}
            />
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Assinatura Premium
            </h2>
            <p className="text-3xl font-bold mb-2 text-gray-800">R$997/ano</p>
            <p className="text-gray-900 mb-4">Equivalente a R$83,08/mês</p>
            <ul className="text-left mb-6">
              <li className="mb-2 text-gray-800 justify-center">✓ Acesso exclusivo a sinais</li>
              <li className="mb-2 text-gray-800 justify-center">✓ Conteúdos para iniciantes</li>
              <li className="mb-2 text-gray-800 justify-center">✓ Materiais complementares</li>
              <li className="text-gray-800 justify-center">✓ 12 meses de acesso</li>
            </ul>
            <button 
              onClick={handleAssinar}
              className="w-full px-4 py-3 font-bold text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Redirecionando...' : 'Assinar o Futuros Tech'}
            </button>
            <div className="flex items-center justify-center mt-4 text-sm text-gray-800">
              <FaLock className="mr-2" />
              <span>Pagamento 100% seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
