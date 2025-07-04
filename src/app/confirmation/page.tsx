'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000); // Redireciona após 5 segundos

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mx-auto mb-6">
          <CheckCircleIcon className="h-8 w-8 text-teal-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Reserva confirmada!</h1>
        <p className="text-gray-600">
          Sua reserva foi realizada com sucesso. Você será redirecionado para a página inicial em alguns segundos.
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Voltar para início
        </button>
      </div>
    </div>
  );
}
