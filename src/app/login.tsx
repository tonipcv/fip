'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Lógica de autenticação aqui
      // Se bem-sucedido:
      router.push('/success');
    } catch (error) {
      // Tratar erro de autenticação
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 p-60">
      <div className="flex justify-center mb-8">
        <Image
          src="/logo.png" // Certifique-se de que o caminho está correto
          alt="Logo da Empresa"
          width={200}
          height={100}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-white-700">E-mail</label>
          <input type="email" id="email" name="email" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-white-700">Senha</label>
          <input type="password" id="password" name="password" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-gray-700 bg-green-300 rounded-full hover:bg-green-400 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
