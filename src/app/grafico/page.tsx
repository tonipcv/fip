'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BottomNavigation from '../../components/BottomNavigation';

export default function Grafico() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      new window.TradingView.widget({
        container_id: 'tradingview_chart',
        width: '100%',
        height: 500,
        symbol: 'BTCUSDT',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'pt',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
        news: ['headlines'],
      });
    };
    document.body.appendChild(script);
  }, []);

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
      
      <div id="tradingview_chart" className="mb-6"></div>

      <div className="text-center mt-7">
        <button
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 font-bold text-black bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none focus:shadow-outline mt-4"
          onClick={() => window.location.href = 'https://apps.apple.com/app/bybit-buy-bitcoin-crypto/id1494961956'}
        >
          Enviar Ordem
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}
