import * as OneSignal from '@onesignal/node-onesignal';

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '';
const ONESIGNAL_REST_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY || '';

// Configuração do cliente OneSignal usando os nomes corretos das propriedades
const configuration = {
    basePath: "https://onesignal.com/api/v1",
    authBasic: {
        api_key: ONESIGNAL_REST_API_KEY,
    },
};

// Criando o cliente usando a API correta do OneSignal
export const oneSignalClient = new OneSignal.DefaultApi(configuration);

// Interface para a notificação
export interface OneSignalNotification {
    app_id: string;
    contents: { [key: string]: string };
    include_player_ids?: string[];
    included_segments?: string[];
}
