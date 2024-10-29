'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Redirecionar para a página de chat após o login
    window.location.href = '/chat';
  };

  return (
    <div className="container mx-auto px-4 p-20 mb-4 mt-40">
      <div className="flex justify-center mb-8">
        <Image
          src="/ft-icone.png"
          alt="Logo da Empresa"
          width={100}
          height={50}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-white-700">E-mail</label>
          <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-white-700">Senha</label>
          <input type="password" id="password" name="password" placeholder="Digite sua senha" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
      <div className="max-w-md mx-auto mt-4 flex justify-between">
        <Link href="/forgot-password" className="text-white hover:text-white-700">
          Esqueceu a senha?
        </Link>
        <Link href="/" className="text-white hover:text-white-700">
          Crie sua conta
        </Link>
      </div>
    </div>
  );
}
