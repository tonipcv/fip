'use client';

import Image from 'next/image';
import Link from 'next/link';
import BottomNavigation from '../../components/BottomNavigation';

export default function Courses() {
  return (
    <div className="container mx-auto px-4 py-10 mb-16 mt-20">
      <div className="flex justify-center mb-4">
        <Image
          src="/ft-icone.png"
          alt="Logo da Empresa"
          width={100}
          height={50}
        />
      </div>

      {/* Título da área de cursos */}
      <div className="text-center font-helvetica mb-14 text-2xl">
        Treinamento
      </div>

      {/* Vídeo principal */}
      <div className="max-w-3xl mx-auto">
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            id="panda-f2639195-5516-4311-925f-673ce546e837"
            src="https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=f2639195-5516-4311-925f-673ce546e837"
            style={{ border: 'none', position: 'absolute', top: 0, left: 0 }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-center mt-16">
        <button className="bg-gray-200 text-black py-2 px-4 rounded mx-1">
          Aula Anterior
        </button>
        <button className="bg-gray-200 text-black py-2 px-4 rounded mx-1">
          Próxima Aula
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}
