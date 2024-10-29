'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Aqui você pode adicionar lógica para enviar o e-mail de recuperação de senha
    // Por enquanto, vamos apenas simular um envio
    setTimeout(() => {
      alert('Se o e-mail existir em nossa base de dados, você receberá instruções para redefinir sua senha.');
      setIsSubmitting(false);
    }, 2000);
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
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar link de recuperação'}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link href="/login" className="text-white-500 hover:text-blue-700">
          Voltar para o login
        </Link>
      </div>
    </div>
  );
}
