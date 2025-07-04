"use client";

import {
  UserCircleIcon,
  HomeIcon,
  CalendarIcon,
  BuildingStorefrontIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState([]);
  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const data = await res.json();
        const userData = Array.isArray(data) ? data[0] : data;
        setUser(userData);
        setBookings(userData.bookings || []);
        setUserProperties(userData.properties || []);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-teal-700 text-lg">
        Carregando...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <HomeIcon className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-teal-600 tracking-tight">
              Urban<span className="text-amber-500">Host</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 bg-white shadow-sm">
              <UserCircleIcon className="h-6 w-6 text-teal-600" />
              <span className="text-teal-700 font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 font-medium shadow-md hover:from-red-600 hover:to-red-700 transition"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Olá, <span className="text-teal-600">{user.name}</span>
            </h1>
            <span className="text-gray-500 text-sm">
              Gerencie seu perfil, reservas e propriedades
            </span>
          </div>
          <div className="flex gap-2 bg-white rounded-2xl shadow border p-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                activeTab === "profile"
                  ? "bg-teal-50 text-teal-700 border-2 border-teal-500 shadow"
                  : "text-gray-600 hover:bg-teal-50"
              }`}
            >
              <UserCircleIcon className="h-5 w-5" />
              Perfil
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                activeTab === "bookings"
                  ? "bg-teal-50 text-teal-700 border-2 border-teal-500 shadow"
                  : "text-gray-600 hover:bg-teal-50"
              }`}
            >
              <CalendarIcon className="h-5 w-5" />
              Reservas
            </button>
            <button
              onClick={() => setActiveTab("properties")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                activeTab === "properties"
                  ? "bg-teal-50 text-teal-700 border-2 border-teal-500 shadow"
                  : "text-gray-600 hover:bg-teal-50"
              }`}
            >
              <BuildingStorefrontIcon className="h-5 w-5" />
              Propriedades
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          {/* Perfil */}
          {activeTab === "profile" && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-teal-100 flex items-center justify-center">
                  <UserCircleIcon className="h-14 w-14 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded font-medium">
                    {user.role === "admin" ? "Administrador" : "Usuário"}
                  </span>
                </div>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400">Telefone</span>
                    <div className="font-medium text-gray-700">{user.phone || "-"}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Função</span>
                    <div className="font-medium text-gray-700 capitalize">{user.role}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reservas */}
          {activeTab === "bookings" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-teal-700">Minhas Reservas</h2>
              {bookings.length === 0 ? (
                <div className="text-gray-500">Você não possui reservas.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookings.map((booking: any) => (
                    <div
                      key={booking.id}
                      className="rounded-2xl bg-[#f9fafb] border border-gray-100 p-5 shadow hover:shadow-md transition cursor-pointer flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={booking.property?.image || "/casa1.jpg"}
                          alt={booking.property?.title || ""}
                          width={100}
                          height={80}
                          className="rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1 text-lg">
                          {booking.property?.title}
                        </h3>
                        <div className="text-xs text-gray-500 mb-2">
                          {booking.property?.address || "Endereço não informado"}
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <CalendarIcon className="h-4 w-4 text-teal-500" />
                          <span className="text-sm">
                            {booking.startDate} até {booking.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded font-semibold ${
                              booking.status === "confirmado"
                                ? "bg-teal-100 text-teal-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Propriedades */}
          {activeTab === "properties" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-teal-700">Minhas Propriedades</h2>
                <button
                  onClick={() => router.push("/property/new")}
                  className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl px-4 py-2 text-sm font-medium shadow hover:from-amber-600 hover:to-amber-700 transition"
                >
                  <BuildingStorefrontIcon className="h-5 w-5" />
                  Nova Propriedade
                </button>
              </div>
              {userProperties.length === 0 ? (
                <div className="text-gray-500">Você não possui propriedades cadastradas.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userProperties.map((property: any) => (
                    <div
                      key={property.id}
                      className="rounded-2xl bg-[#f9fafb] border border-gray-100 p-5 shadow hover:shadow-md transition cursor-pointer flex gap-4"
                      onClick={() => router.push(`/property/${property.id}`)}
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={property.image || "/casa1.jpg"}
                          alt={property.title}
                          width={100}
                          height={80}
                          className="rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1 text-lg">
                          {property.title}
                        </h3>
                        <div className="text-xs text-gray-500 mb-1">
                          {property.address || "Endereço não informado"}
                        </div>
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-4 w-4 text-amber-500" />
                          <span className="text-xs font-medium">
                            {property.rating ? property.rating.toFixed(1) : "5.0"}
                          </span>
                          <span className="bg-teal-100 text-teal-700 rounded px-2 py-0.5 text-xs font-medium ml-2">
                            {property.type || "Apartamento"}
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-bold text-teal-700">
                          R${property.pricePerNight || "-"} <span className="font-normal text-gray-500">/ noite</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
