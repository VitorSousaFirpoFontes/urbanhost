"use client";

import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  HeartIcon,
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchProperties } from "@/lib/api";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState(""); // <-- campo de busca
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchProperties()
      .then((data) => {
        setProperties(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar propriedades", err);
      });

    // Verificar se o usuário está autenticado
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setMenuOpen(false);
    router.push("/");
  };

  // FILTRO DE PROPRIEDADES POR CATEGORIA E PESQUISA
  const filteredProperties = properties.filter((p: any) => {
    const matchesCategory = activeCategory ? p.category === activeCategory : true;
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.city?.toLowerCase().includes(search.toLowerCase()) ||
      p.address?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { name: "Praias", icon: "🌊" },
    { name: "Cabana", icon: "🌲" },
    { name: "Design", icon: "🎨" },
    { name: "Tropical", icon: "🌴" },
    { name: "Vistas", icon: "🏞️" },
    { name: "Piscina", icon: "💦" },
    { name: "Ilhas", icon: "🏖️" },
    { name: "Acampamento", icon: "⛺" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <HomeIcon className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-teal-600 tracking-tight">
              Urban<span className="text-amber-500">Host</span>
            </span>
          </div>

          {/* Barra de pesquisa */}
          <div className="hidden flex-1 max-w-md md:flex items-center justify-between rounded-full border border-gray-200 bg-white py-2 pl-4 pr-2 shadow-sm transition-all hover:shadow-md">
            <input
              type="text"
              placeholder="Pesquisar cidade, destino, nome do imóvel..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-gray-700 text-sm"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  // A busca já é reativa ao digitar, mas pode adicionar ações extras se desejar
                }
              }}
            />
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 ml-2"
              tabIndex={-1}
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Área de autenticação visível */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/create")}
              className="hidden md:flex rounded-full px-4 py-2 text-sm font-medium transition bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md hover:from-teal-600 hover:to-teal-700"
            >
              Anuncie sua hospedagem
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 p-2 transition hover:shadow-md"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">Olá, Usuário</span>
                    <span className="text-xs text-gray-500">Conta</span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-800">
                    <UserCircleIcon className="h-6 w-6" />
                  </div>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-14 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium">usuario@email.com</p>
                      <p className="text-sm text-gray-500">Conta verificada</p>
                    </div>
                    <ul className="text-sm text-gray-700">
                      <li>
                        <button
                          onClick={() => router.push("/profile")}
                          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
                        >
                          <UserIcon className="h-5 w-5 text-gray-500" />
                          Minha conta
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push("/trips")}
                          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
                        >
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Minhas viagens
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push("/wishlist")}
                          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
                        >
                          <HeartIcon className="h-5 w-5 text-gray-500" />
                          Favoritos
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5" />
                          Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="hidden md:flex items-center gap-1 px-4 py-2 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  Entrar
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:from-amber-600 hover:to-amber-700 transition-all"
                >
                  Cadastre-se
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Acomodações Urbanas</h1>

        {/* Categorias */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                activeCategory === category.name
                  ? "bg-teal-50 border-2 border-teal-500 text-teal-700"
                  : "bg-white border border-gray-200 hover:border-teal-300"
              }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Lista de propriedades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProperties.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              Nenhum imóvel encontrado para sua pesquisa.
            </div>
          )}
          {filteredProperties.map((property: any) => (
            <div
              key={property.id}
              onClick={() => router.push(`/property/${property.id}`)}
              className="cursor-pointer group rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={property.image || "/casa1.jpg"}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-600 hover:text-red-500 transition-colors">
                  <HeartIcon className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                  {property.type}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {property.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-teal-50 px-2 py-1 rounded">
                    <StarIcon className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">
                      {property.rating ? property.rating.toFixed(1) : "4.8"}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  <span className="font-bold text-lg text-gray-900">R${property.pricePerNight}</span>
                  <span className="text-gray-600"> / noite</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
