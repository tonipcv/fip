import { useEffect, useState } from 'react';

declare global {
  interface Window {
    OneSignal: any;
  }
}

interface DeviceState {
  userId: string;
  pushToken: string;
  isSubscribed: boolean;
  isPushDisabled: boolean;
}

export const useOneSignal = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isSubscribed: boolean;
    userId: string | null;
    pushEnabled: boolean;
  }>({
    isSubscribed: false,
    userId: null,
    pushEnabled: false
  });

  useEffect(() => {
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isiOS);

    if (typeof window !== 'undefined' && !isiOS) {
      window.OneSignal = window.OneSignal || [];

      const initOneSignal = async () => {
        await window.OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
          notifyButton: {
            enable: false, // Desabilitamos o botão padrão
          },
          allowLocalhostAsSecureOrigin: true,
          promptOptions: {
            slidedown: {
              prompts: [
                {
                  type: "push",
                  autoPrompt: false,
                  text: {
                    actionMessage: "Deseja receber notificações de novos sinais?",
                    acceptButton: "Sim",
                    cancelButton: "Agora não"
                  }
                }
              ]
            }
          }
        });

        // Verifica status inicial
        const deviceState = await window.OneSignal.getDeviceState();
        console.log('Estado inicial do dispositivo:', deviceState);
        
        setSubscriptionStatus({
          isSubscribed: deviceState?.isSubscribed || false,
          userId: deviceState?.userId || null,
          pushEnabled: !deviceState?.isPushDisabled
        });

        // Se não estiver inscrito, mostra o prompt
        if (!deviceState?.isSubscribed) {
          console.log('Usuário não inscrito, mostrando prompt...');
          setTimeout(() => {
            window.OneSignal.showSlidedownPrompt();
          }, 2000); // Aguarda 2 segundos antes de mostrar
        }

        // Monitora mudanças na inscrição
        window.OneSignal.on('subscriptionChange', async (isSubscribed: boolean) => {
          console.log('Status da inscrição mudou:', isSubscribed);
          const newState = await window.OneSignal.getDeviceState();
          setSubscriptionStatus({
            isSubscribed: isSubscribed,
            userId: newState?.userId || null,
            pushEnabled: !newState?.isPushDisabled
          });
        });
      };

      initOneSignal();
    }
  }, []);

  const showNotificationPrompt = () => {
    if (isIOS) {
      alert('Para receber notificações no iOS:\n\n1. Adicione este site à sua tela inicial\n2. Abra o app pela tela inicial\n3. Permita as notificações quando solicitado');
      return;
    }

    if (window.OneSignal) {
      window.OneSignal.showSlidedownPrompt();
    }
  };

  return { 
    getUserId: async () => {
      if (isIOS) return null;
      const state = await window.OneSignal?.getDeviceState();
      return state?.userId;
    }, 
    isIOS, 
    subscriptionStatus,
    showNotificationPrompt
  };
};
