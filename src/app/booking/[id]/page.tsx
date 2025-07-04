'use client';

import {
  ArrowLeftIcon,
  HomeIcon,
  UserCircleIcon,
  CalendarIcon,
  CreditCardIcon,
  MapPinIcon,
  UserIcon,
  WifiIcon,
  TvIcon,
  FireIcon,
  HomeModernIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPropertyById, createReservation } from '@/lib/api';

export default function ReservationPage() {
  const { id } = useParams();
  const router = useRouter();

  const [property, setProperty] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('payment');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('Maria Silva');
  const [email, setEmail] = useState('maria@exemplo.com');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carrega dados reais do imóvel
  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchPropertyById(String(id));
        setProperty({
          ...data,
          image: data.imageUrl || "/casa1.jpg",
          host: {
            name: "Carlos Oliveira",
            image: "/host1.jpg",
          },
        });
      } catch (err) {
        setError("Erro ao carregar propriedade.");
      }
    };

    loadProperty();
  }, [id]);

  const totalPrice = property?.pricePerNight * nights || 0;
  const serviceFee = 120;
  const cleaningFee = 80;
  const grandTotal = totalPrice + serviceFee + cleaningFee;

  const handleReservation = async () => {
    if (activeTab !== 'confirmation') {
      setActiveTab('confirmation');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Você precisa estar logado para reservar.');
        return;
      }

      await createReservation(
        {
          propertyId: property.id,
          startDate: "2025-08-10",
          endDate: "2025-08-13",
          guests,
        },
        token
      );

      router.push('/confirmation');
    } catch (err) {
      setError('Erro ao fazer a reserva.');
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return <p className="p-6">Carregando dados da propriedade...</p>;
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          
          <div className="flex items-center gap-2">
            <HomeIcon className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-teal-600 tracking-tight">
              Urban<span className="text-amber-500">Host</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="hidden rounded-full px-4 py-2 text-sm font-medium transition bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md hover:from-teal-600 hover:to-teal-700 md:block">
              Ajuda
            </button>
            <button className="flex items-center gap-3 rounded-full border border-gray-200 p-2 transition hover:shadow-md">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-800">
                <UserCircleIcon className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detalhes da Reserva */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Finalize sua reserva</h1>
                <p className="text-gray-600 mt-2">Confira os detalhes antes de concluir</p>
              </div>
              
              {/* Tabs */}
              <div className="border-b">
                <div className="flex">
                  <button
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'details' 
                        ? 'border-b-2 border-teal-500 text-teal-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Detalhes
                  </button>
                  <button
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'payment' 
                        ? 'border-b-2 border-teal-500 text-teal-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('payment')}
                  >
                    Pagamento
                  </button>
                  <button
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'confirmation' 
                        ? 'border-b-2 border-teal-500 text-teal-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('confirmation')}
                  >
                    Confirmação
                  </button>
                </div>
              </div>
              
              {/* Conteúdo da Tab Ativa */}
              {activeTab === 'details' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Sua viagem</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Datas</h3>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <CalendarIcon className="h-6 w-6 text-teal-600" />
                        <div>
                          <p className="font-medium">10 ago - 15 ago</p>
                          <p className="text-sm text-gray-500">3 noites</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Hóspedes</h3>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <UserIcon className="h-6 w-6 text-teal-600" />
                        <div>
                          <p className="font-medium">{guests} hóspede{guests > 1 ? 's' : ''}</p>
                          <p className="text-sm text-gray-500">2 adultos, 0 crianças</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mt-8 mb-4">Detalhes do contato</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Pagamento</h2>
                  
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-5 text-white mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-medium">Cartão de crédito</span>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white/20"></div>
                        <div className="w-8 h-8 rounded-full bg-white/20"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Número do cartão</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Validade</label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/AA"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Nome no cartão</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <CheckCircleIcon className="h-6 w-6 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      Seus dados estão protegidos. Esta página utiliza criptografia SSL para garantir a segurança das suas informações.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'confirmation' && (
                <div className="p-6">
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                      <CheckCircleIcon className="h-8 w-8 text-teal-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tudo pronto!</h2>
                    <p className="text-gray-600 max-w-md">
                      Confira os detalhes da sua reserva abaixo. Ao confirmar, você concorda com nossos Termos de Uso e Política de Privacidade.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-700 mb-3">Resumo da reserva</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Datas:</span>
                        <span className="font-medium">10 ago - 15 ago (3 noites)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hóspedes:</span>
                        <span className="font-medium">2 adultos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Propriedade:</span>
                        <span className="font-medium">Apartamento com Vista para o Mar</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-6 border-t">
                <div className="flex justify-between">
                  <button 
                    onClick={() => router.back()}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleReservation}
                    className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg font-medium text-white shadow-md hover:from-teal-600 hover:to-teal-700"
                  >
                    {activeTab === 'confirmation' ? 'Confirmar Reserva' : 'Continuar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resumo da Propriedade */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <div className="flex items-center gap-1 text-sm">
                    <StarIcon className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{property.title}</h3>
                    <div className="flex items-center mt-1 text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-teal-50 px-2 py-1 rounded">
                    <StarIcon className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <HomeModernIcon className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} quartos</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    <span>{property.beds} camas</span>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span>{property.baths} banheiros</span>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h4 className="font-semibold mb-4">Detalhes do preço</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>R${property.price} × {nights} noites</span>
                      <span>R${totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de limpeza</span>
                      <span>R${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de serviço</span>
                      <span>R${serviceFee}</span>
                    </div>
                  </div>
                  
                  <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>R${grandTotal}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={property.host.image}
                        alt={property.host.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Anfitrião: {property.host.name}</p>
                    <p className="text-xs text-gray-500">Resposta em até 2 horas</p>
                  </div>
                </div>
                
                <div className="mt-6 border rounded-xl p-5 bg-teal-50 border-teal-100">
                  <div className="flex items-center mb-3">
                    <CheckCircleIcon className="h-5 w-5 text-teal-600 mr-2" />
                    <h4 className="font-medium">Proteção da reserva</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Todas as reservas estão protegidas por nosso sistema de segurança e garantia de satisfação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}