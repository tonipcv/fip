'use client';

import Image from 'next/image';
import BottomNavigation from '../../components/BottomNavigation';
import { oneSignalClient, OneSignalNotification } from '@/lib/onesignal';
import { useOneSignal } from '@/hooks/useOneSignal';
import { useEffect, useState } from 'react';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function Chat() {
  const { getUserId, isIOS, subscriptionStatus, showNotificationPrompt } = useOneSignal();
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

  // Adicione este componente para mostrar o status
  const SubscriptionStatus = () => (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 text-sm">
      <div className="max-w-md mx-auto">
        <p className="flex items-center justify-between">
          <span>Status da Inscrição:</span>
          <span className={`px-2 py-1 rounded ${
            subscriptionStatus.isSubscribed ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {subscriptionStatus.isSubscribed ? 'Inscrito' : 'Não Inscrito'}
          </span>
        </p>
        {subscriptionStatus.userId && (
          <p className="text-xs mt-1">ID: {subscriptionStatus.userId}</p>
        )}
        <p className="flex items-center justify-between mt-1">
          <span>Notificações:</span>
          <span className={`px-2 py-1 rounded ${
            subscriptionStatus.pushEnabled ? 'bg-green-500' : 'bg-yellow-500'
          }`}>
            {subscriptionStatus.pushEnabled ? 'Habilitadas' : 'Desabilitadas'}
          </span>
        </p>
      </div>
    </div>
  );

  const solicitarPermissao = async () => {
    try {
      console.log('Solicitando permissão...');
      window.OneSignal.showSlidedownPrompt();
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    }
  };

  const renderIOSInstructions = () => {
    if (!isIOS) return null;

    return (
      <div className="text-center mb-6 p-4 bg-yellow-500 bg-opacity-20 rounded-lg">
        <h3 className="text-lg font-bold text-yellow-500 mb-2">📱 Usuários iOS</h3>
        <p className="text-white mb-4">
          Para receber notificações no iOS, siga estes passos:
        </p>
        <ol className="text-left text-white space-y-2 ml-4">
          <li>1. Toque no botão compartilhar <span className="inline-block">⬆️</span></li>
          <li>2. Selecione "Adicionar à Tela de Início" 📱</li>
          <li>3. Abra o app pela tela inicial 🏠</li>
          <li>4. Aceite as notificações quando solicitado 🔔</li>
        </ol>
        <button
          onClick={() => {
            alert('Procure o botão de compartilhar (⬆️) no seu navegador e selecione "Adicionar à Tela de Início"');
          }}
          className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-full font-bold"
        >
          Como Instalar?
        </button>
      </div>
    );
  };

  // Adicione esta função no início do componente Chat
  const isPWA = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches ||
             (window.navigator as any).standalone ||
             document.referrer.includes('android-app://');
    }
    return false;
  };

  // Adicione este useEffect para debug
  useEffect(() => {
    console.log('Rodando como PWA:', isPWA());
    console.log('Display Mode:', window.matchMedia('(display-mode: standalone)').matches);
    console.log('iOS Standalone:', (window.navigator as any).standalone);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 p-20 mb-4">
        <SubscriptionStatus />
        <div className="flex justify-center mb-8">
          <Image
            src="/ft-icone.png"
            alt="Logo da Empresa"
            width={100}
            height={50}
          />
        </div>

        {isIOS ? renderIOSInstructions() : (
          !subscriptionStatus.isSubscribed && (
            <div className="text-center mb-6">
              <button
                onClick={showNotificationPrompt}
                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                🔔 Ativar Notificações
              </button>
            </div>
          )
        )}

        <div className="text-center font-helvetica mb-10 mt-30 text-2xl text-white">
          Sinais de Entradas:
        </div>
        
        <div className="h-full max-w-md mx-auto bg-black rounded-lg shadow-md p-4 overflow-y-auto" 
             style={{ maxHeight: '500px', backgroundColor: '#000000' }}>
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
    </div>
  );
}
