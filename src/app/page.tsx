'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Aqui você pode adicionar lógica para verificar se as senhas coincidem
    window.location.href = 'https://k17.com.br';
  };

  return (
    <div className="flex-auto justify-center container mx-auto px-4 p-20 mb-4 mt-16">
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
          <label htmlFor="name" className="block mb-2 text-sm font-bold text-white-700 font-helvetica">Nome</label>
          <input type="text" id="name" name="name" placeholder="Digite seu nome" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-white-700">E-mail</label>
          <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-bold text-white-700">Telefone</label>
          <input type="tel" id="phone" name="phone" placeholder="Digite seu telefone" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-white-700">Senha</label>
          <input type="password" id="password" name="password" placeholder="Digite sua senha" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-white-700">Confirmar Senha</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme sua senha" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Redirecionando...' : 'Registrar'}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link href="/login" className="text-white-500 hover:text-white-700">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </div>
  );
}
