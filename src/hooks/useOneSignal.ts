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

  useEffect(() => {
    // Detecta se é iOS
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isiOS);

    if (typeof window !== 'undefined') {
      window.OneSignal = window.OneSignal || [];

      window.OneSignal.push(() => {
        console.log('Iniciando OneSignal...');
        console.log('Dispositivo iOS:', isiOS);
        
        window.OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
          notifyButton: {
            enable: !isiOS, // Desabilita o botão de notificação no iOS
          },
          allowLocalhostAsSecureOrigin: true,
          serviceWorkerParam: { scope: '/push/onesignal/' },
          serviceWorkerPath: '/push/onesignal/OneSignalSDKWorker.js',
        });

        // Registra handlers para debug
        window.OneSignal.on('subscriptionChange', function (isSubscribed: boolean) {
          console.log('Mudança na inscrição:', isSubscribed);
        });

        window.OneSignal.on('notificationPermissionChange', function (permissionChange: any) {
          console.log('Mudança na permissão:', permissionChange);
        });

        // Verifica estado atual
        window.OneSignal.isPushNotificationsEnabled((isEnabled: boolean) => {
          console.log('Notificações push estão habilitadas:', isEnabled);
        });

        window.OneSignal.getDeviceState((deviceState: DeviceState) => {
          console.log('Estado do dispositivo:', {
            userId: deviceState?.userId,
            pushToken: deviceState?.pushToken,
            isSubscribed: deviceState?.isSubscribed,
            isPushDisabled: deviceState?.isPushDisabled
          });
        });

        // Força exibição do prompt de permissão
        window.OneSignal.showSlidedownPrompt();
      });
    }
  }, []);

  const getUserId = async () => {
    try {
      console.log('Obtendo userId...');
      const deviceState = await new Promise<DeviceState>((resolve) => {
        window.OneSignal.push(() => {
          window.OneSignal.getDeviceState((state: DeviceState) => {
            console.log('Device State:', state);
            resolve(state);
          });
        });
      });
      console.log('UserId obtido:', deviceState?.userId);
      return deviceState?.userId;
    } catch (error) {
      console.error('Erro ao obter userId:', error);
      return null;
    }
  };

  return { getUserId, isIOS };
};
