'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  StarIcon, 
  HeartIcon as HeartSolidIcon,
  ArrowLeftIcon,
  MapPinIcon,
  UserIcon,
  WifiIcon,
  TvIcon,
  FireIcon,
  HomeIcon,
  SunIcon,
  PlusIcon,
  MinusIcon,
  CalendarIcon
} from '@heroicons/react/24/solid';
import {
  HeartIcon as HeartOutlineIcon,
  HomeModernIcon,
  UserGroupIcon,
  CheckCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface PropertyDetails {
  id: number;
  title: string;
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  amenities: string[];
  bedrooms: number;
  beds: number;
  baths: number;
  host: {
    name: string;
    image: string;
    joined: string;
  };
  gallery: string[];
}

export default function PropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(3);

  const amenitiesIcons = [
    { name: "Wi-Fi", icon: <WifiIcon className="h-5 w-5 text-teal-600" /> },
    { name: "TV", icon: <TvIcon className="h-5 w-5 text-teal-600" /> },
    { name: "Cozinha", icon: <FireIcon className="h-5 w-5 text-teal-600" /> },
    { name: "Estacionamento", icon: <HomeIcon className="h-5 w-5 text-teal-600" /> },
    { name: "Varanda", icon: <SunIcon className="h-5 w-5 text-teal-600" /> },
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:3001/properties/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar imóvel");
        const data = await res.json();
        setProperty({
          id: data.id,
          title: data.title,
          location: "Local não especificado",
          distance: "Distância não calculada",
          dates: "10-15 ago",
          price: data.pricePerNight,
          rating: 4.8,
          image: "/casa1.jpg",
          category: data.type,
          description: data.description || "Sem descrição.",
          amenities: ["Wi-Fi", "TV", "Cozinha", "Estacionamento", "Varanda"],
          bedrooms: 2,
          beds: 3,
          baths: 1,
          host: {
            name: "Anfitrião Padrão",
            image: "/host1.jpg",
            joined: "2023"
          },
          gallery: ["/casa1.jpg", "/casa2.jpg", "/casa3.jpg"]
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <p className="text-gray-700 text-center mt-10">Carregando detalhes do imóvel...</p>
      </main>
    );
  }

  const totalPrice = property.price * nights;
  const serviceFee = 120;
  const cleaningFee = 80;
  const grandTotal = totalPrice + serviceFee + cleaningFee;

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Voltar
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <HeartOutlineIcon className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <UserCircleIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Título e Localização */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center mt-2">
            <StarIcon className="h-5 w-5 text-amber-500" />
            <span className="ml-1 font-medium">{property.rating}</span>
            <span className="mx-2">•</span>
            <span className="text-gray-600">{property.distance}</span>
            <span className="mx-2">•</span>
            <span className="text-gray-600">{property.location}</span>
          </div>
        </div>

        {/* Galeria de Imagens */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="relative h-[500px]">
            <Image 
              src={property.gallery[activeImage]} 
              alt={property.title} 
              fill
              className="object-cover"
            />
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartOutlineIcon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
            {property.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-2 w-2 rounded-full ${
                  index === activeImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {/* Informações sobre a propriedade */}
            <div className="border-b border-gray-200 pb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{property.title}</h2>
                  <div className="mt-2 flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-lg bg-teal-50 px-3 py-1 rounded">
                  <StarIcon className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">{property.rating}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center">
                  <HomeModernIcon className="h-5 w-5 text-gray-600 mr-2" />
                  <span>{property.bedrooms} quartos</span>
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-gray-600 mr-2" />
                  <span>{property.beds} camas</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
                  <span>{property.baths} banheiros</span>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                  {property.category}
                </span>
              </div>
            </div>

            {/* Descrição */}
            <div className="border-b border-gray-200 py-8">
              <h3 className="text-xl font-semibold mb-4">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Comodidades */}
            <div className="border-b border-gray-200 py-8">
              <h3 className="text-xl font-semibold mb-6">Comodidades</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenitiesIcons.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    {amenity.icon}
                    <span className="ml-2">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anfitrião */}
            <div className="py-8">
              <h3 className="text-xl font-semibold mb-4">Anfitrião</h3>
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image 
                    src={property.host.image} 
                    alt={property.host.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{property.host.name}</h4>
                  <p className="text-gray-600">Anfitrião desde {property.host.joined}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD RESERVA E SEGURANÇA */}
          <div className="lg:col-span-1">
            {/* Card de Reserva */}
            <div className="border rounded-xl p-6 shadow-lg sticky top-[88px] bg-white z-10">
              <div className="flex justify-between items-center mb-4">
                <p>
                  <span className="text-2xl font-bold">R${property.price}</span>
                  <span className="text-gray-600"> / noite</span>
                </p>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">{property.rating}</span>
                </div>
              </div>

              {/* Datas e Hóspedes */}
              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 border-r">
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECK-IN</label>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="font-medium">10 ago</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECKOUT</label>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="font-medium">15 ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">HÓSPEDES</label>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{guests} hóspede{guests > 1 ? 's' : ''}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setGuests(guests + 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                onClick={() => router.push(`/booking/${property.id}`)}
              >
                Reservar
              </button>
              
              <p className="mt-4 text-center text-gray-600 text-sm">Você ainda não será cobrado</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span>R${property.price} x {nights} noites</span>
                  <span>R${property.price * nights}</span>
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
              
              <div className="border-t mt-4 pt-4 flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>R${grandTotal}</span>
              </div>
            </div>

            {/* Card de Segurança */}
            <div className="mt-8 border rounded-xl p-6 bg-white">
              <div className="flex items-center mb-4">
                <CheckCircleIcon className="h-6 w-6 text-teal-600 mr-2" />
                <h3 className="font-semibold">Segurança e confiabilidade</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Todas as reservas estão protegidas por nosso sistema de segurança e garantia de satisfação.
              </p>
            </div>
          </div>
        </div>

        {/* Propriedades semelhantes */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Propriedades semelhantes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((id) => (
              <div 
                key={id}
                onClick={() => router.push(`/property/${id}`)}
                className="cursor-pointer group rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`/casa${id}.jpg`}
                    alt={`Acomodação ${id}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-600 hover:text-red-500 transition-colors">
                    <HeartOutlineIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Localização {id}, Brasil</h3>
                      <p className="text-xs text-gray-500 mb-1">{5 + id} km de distância</p>
                      <p className="text-xs text-gray-500 mb-2">10-15 ago</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm bg-teal-50 px-2 py-1 rounded">
                      <StarIcon className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">4.{id}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">
                    <span className="font-bold text-lg text-gray-900">R${300 + id * 15}</span>
                    <span className="text-gray-600"> / noite</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
