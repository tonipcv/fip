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

    if (typeof window !== 'undefined') {
      window.OneSignal = window.OneSignal || [];

      window.OneSignal.push(() => {
        console.log('Iniciando OneSignal...');
        
        window.OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
          notifyButton: {
            enable: false,
          },
          allowLocalhostAsSecureOrigin: true,
          promptOptions: {
            slidedown: {
              prompts: [
                {
                  type: "push",
                  autoPrompt: false,
                  text: {
                    actionMessage: "Gostaria de receber notificações de novos sinais?",
                    acceptButton: "Permitir",
                    cancelButton: "Cancelar"
                  }
                }
              ]
            }
          }
        });

        // Verifica status inicial
        window.OneSignal.getDeviceState((deviceState: DeviceState) => {
          setSubscriptionStatus({
            isSubscribed: deviceState?.isSubscribed || false,
            userId: deviceState?.userId || null,
            pushEnabled: !deviceState?.isPushDisabled
          });
          console.log('Estado inicial:', deviceState);
        });

        // Monitora mudanças na inscrição
        window.OneSignal.on('subscriptionChange', function(isSubscribed: boolean) {
          console.log('Status da inscrição mudou:', isSubscribed);
          window.OneSignal.getDeviceState((deviceState: DeviceState) => {
            setSubscriptionStatus({
              isSubscribed: isSubscribed,
              userId: deviceState?.userId || null,
              pushEnabled: !deviceState?.isPushDisabled
            });
          });
        });
      });
    }
  }, []);

  const getUserId = async () => {
    try {
      const deviceState = await new Promise<DeviceState>((resolve) => {
        window.OneSignal.push(() => {
          window.OneSignal.getDeviceState((state: DeviceState) => {
            resolve(state);
          });
        });
      });
      return deviceState?.userId;
    } catch (error) {
      console.error('Erro ao obter userId:', error);
      return null;
    }
  };

  return { getUserId, isIOS, subscriptionStatus };
};
