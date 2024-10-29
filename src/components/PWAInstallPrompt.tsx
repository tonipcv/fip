'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installStatus, setInstallStatus] = useState('');
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Verifica se está rodando como PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    
    setIsPWA(isStandalone);

    if (isStandalone) {
      console.log('PWA já está instalado');
      setInstallStatus('installed');
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      console.log('beforeinstallprompt triggered');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
      setInstallStatus('can-install');
    };

    window.addEventListener('beforeinstallprompt', handler);
    console.log('PWA install listener added');

    // Detecta quando o PWA é instalado
    window.addEventListener('appinstalled', (e) => {
      console.log('PWA instalado com sucesso');
      setInstallStatus('just-installed');
      setIsPWA(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('Prompt não disponível');
      return;
    }

    try {
      console.log('Iniciando prompt de instalação');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Resultado da instalação:', outcome);
      
      if (outcome === 'accepted') {
        console.log('PWA instalado com sucesso');
        setInstallStatus('just-installed');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Erro na instalação:', error);
    }
  };

  // Mostra o status atual para debug
  return (
    <>
      {showPrompt && (
        <div className="fixed bottom-20 left-0 right-0 mx-4 bg-black p-4 rounded-lg shadow-lg border border-gray-700">
          <p className="text-white mb-3">Instale nosso app para uma melhor experiência!</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowPrompt(false)}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Depois
            </button>
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Instalar
            </button>
          </div>
        </div>
      )}
      
      {/* Debug info */}
      <div className="fixed top-0 right-0 m-4 p-2 bg-black bg-opacity-75 text-white text-xs rounded">
        Status: {installStatus || 'não instalado'}<br />
        Prompt disponível: {deferredPrompt ? 'sim' : 'não'}<br />
        {isPWA ? 'Rodando como PWA' : 'Navegador normal'}
      </div>
    </>
  );
} 