import OneSignal from '@onesignal/node-onesignal';

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '';
const ONESIGNAL_REST_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY || '';

// Configuração do cliente OneSignal
const configuration = {
    appKey: ONESIGNAL_REST_API_KEY,
    appId: ONESIGNAL_APP_ID
};

// Criando o cliente usando a configuração correta
export const oneSignalClient = {
    async createNotification(notification: OneSignalNotification) {
        const response = await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`
            },
            body: JSON.stringify(notification)
        });

        if (!response.ok) {
            throw new Error('Falha ao enviar notificação');
        }

        return response.json();
    }
};

// Interface para a notificação
export interface OneSignalNotification {
    app_id: string;
    contents: { [key: string]: string };
    include_player_ids?: string[];
    included_segments?: string[];
}
