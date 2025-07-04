'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  property: {
    id: string;
    title: string;
    pricePerNight: number;
  };
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3001/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Erro ao buscar reservas');

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="p-6">Carregando reservas...</p>;
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Minhas Reservas</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">Você ainda não possui reservas.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => router.push(`/my-bookings/${booking.id}`)}
              className="border rounded-xl p-5 shadow-sm bg-white cursor-pointer hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">
                {booking.property.title}
              </h2>
              <p className="text-sm text-gray-500">
                Check-in: {new Date(booking.checkIn).toLocaleDateString()} | Check-out: {new Date(booking.checkOut).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700 font-medium">
                Total: R${booking.totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-teal-600 mt-1 font-semibold">
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
