'use client';

import Image from 'next/image';
import BottomNavigation from '../../components/BottomNavigation';
import { oneSignalClient, OneSignalNotification } from '@/lib/onesignal';
import { useOneSignal } from '@/hooks/useOneSignal';
import { useEffect, useState } from 'react';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function Chat() {
  const { getUserId, isIOS } = useOneSignal();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeOneSignal = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    initializeOneSignal();
  }, [getUserId]);

  const enviarNotificacao = async () => {
    try {
      const notification = {
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '',
        contents: {
          en: 'Nova mensagem recebida!'
        },
        ...(userId 
          ? { include_player_ids: [userId] }
          : { included_segments: ['All'] }
        )
      };

      await oneSignalClient.createNotification(notification);
      console.log('Notificação enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  const testarIntegracao = async () => {
    try {
      console.log('Iniciando teste de integração...');
      
      // Verifica se as notificações estão habilitadas
      const permission = await Notification.requestPermission();
      console.log('Status da permissão:', permission);
      
      const id = await getUserId();
      console.log('ID do usuário atual:', id);

      if (!id) {
        console.log('Usuário não está inscrito. Solicitando inscrição...');
        window.OneSignal.showSlidedownPrompt();
        return;
      }

      const notification = {
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '',
        contents: {
          en: 'Teste de integração OneSignal!'
        },
        include_player_ids: [id]
      };

      console.log('Enviando notificação:', notification);
      await oneSignalClient.createNotification(notification);
      console.log('Notificação de teste enviada com sucesso!');
    } catch (error) {
      console.error('Erro detalhado no teste:', error);
    }
  };

  const renderIOSOptions = () => {
    if (!isIOS) return null;

    return (
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500 mb-2">
          Para receber notificações no iOS, você pode:
        </p>
        <div className="space-y-2">
          <a
            href="#" // Link para sua app store
            className="block w-full md:w-1/2 lg:w-1/3 mx-auto px-4 py-2 font-bold text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          >
            Baixar o App
          </a>
          <button
            onClick={() => {
              // Adicionar à tela inicial como PWA
              alert('Adicione este site à sua tela inicial para receber notificações');
            }}
            className="block w-full md:w-1/2 lg:w-1/3 mx-auto px-4 py-2 font-bold text-black bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:shadow-outline"
          >
            Adicionar à Tela Inicial
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 p-20 mb-4">
      <div className="flex justify-center mb-8">
        <Image
          src="/ft-icone.png"
          alt="Logo da Empresa"
          width={100}
          height={50}
        />
      </div>

      {/* Div com o texto "Entradas" com fonte maior */}
      <div className="text-center font-helvetica mb-10 mt-30 text-2xl">
        Sinais de Entradas:
      </div>
      
      <div className="h-full max-w-md mx-auto bg-black rounded-lg shadow-md p-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
        <div className="mb-4">
          <div className="bg-black p-3 rounded-lg border-2 border-gray-100">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
          <div className="bg-black p-3 rounded-lg mt-3 border-2 border-gray-100">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
          <div className="bg-black p-3 rounded-lg mt-3 border-2 border-gray-100">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
          <div className="bg-black p-3 rounded-lg mt-3 border-2 border-gray-100">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-7">
        {!isIOS && (
          <>
            <button
              className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 font-bold text-black bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:shadow-outline mt-4"
              onClick={enviarNotificacao}
            >
              Enviar Ordem
            </button>

            <button
              className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline mt-4"
              onClick={testarIntegracao}
            >
              Testar Integração
            </button>
          </>
        )}

        {renderIOSOptions()}
      </div>

      <PWAInstallPrompt />
      <BottomNavigation />
    </div>
  );
}
