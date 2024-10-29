'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    // Aqui você pode adicionar lógica para alterar a senha
    // Por enquanto, vamos apenas simular uma alteração
    setTimeout(() => {
      alert('Sua senha foi alterada com sucesso!');
      setIsSubmitting(false);
      // Redirecionar para a página de login ou dashboard após a alteração
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
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-white-700">Nova Senha</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Digite sua nova senha"
            name="password" 
            required 
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-white-700">Confirmar Nova Senha</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirme sua nova senha"
            name="confirmPassword" 
            required 
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Alterando...' : 'Alterar Senha'}
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
