'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  property: {
    title: string;
    pricePerNight: number;
  };
}

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setError('Reserva não encontrada.');
          return;
        }

        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar reserva.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <p className="p-6">Carregando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!booking) return null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Detalhes da Reserva</h1>
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <p><strong>Imóvel:</strong> {booking.property.title}</p>
        <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
        <p><strong>Preço por noite:</strong> R${booking.property.pricePerNight.toFixed(2)}</p>
        <p><strong>Total:</strong> R${booking.totalPrice.toFixed(2)}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-6 inline-block px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Voltar
      </button>
    </main>
  );
}
