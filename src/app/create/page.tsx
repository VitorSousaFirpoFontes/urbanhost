"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import {
  HomeIcon,
  MapPinIcon,
  PhotoIcon,
  ArrowsPointingOutIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  WifiIcon,
  TvIcon,
  FireIcon,
  ParkingIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function CreateProperty() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "APARTMENT",
    address: "",
    city: "",
    state: "",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 100,
    cleaningFee: 50,
    amenities: [] as string[],
  });

  const propertyTypes = [
    { value: "APARTMENT", label: "Apartamento" },
    { value: "HOUSE", label: "Casa" },
    { value: "LOFT", label: "Loft" },
    { value: "CABIN", label: "Cabana" },
    { value: "BEACH_HOUSE", label: "Casa de Praia" },
    { value: "FARM", label: "Sítio/Fazenda" },
  ];

  const availableAmenities = [
    { id: "wifi", label: "Wi-Fi", icon: <WifiIcon className="h-5 w-5" /> },
    { id: "tv", label: "TV", icon: <TvIcon className="h-5 w-5" /> },
    { id: "kitchen", label: "Cozinha", icon: <FireIcon className="h-5 w-5" /> },
    { id: "parking", label: "Estacionamento", icon: <ParkingIcon className="h-5 w-5" /> },
    { id: "pool", label: "Piscina", icon: <SparklesIcon className="h-5 w-5" /> },
    { id: "ac", label: "Ar Condicionado", icon: <SparklesIcon className="h-5 w-5" /> },
    { id: "washer", label: "Máquina de Lavar", icon: <SparklesIcon className="h-5 w-5" /> },
    { id: "pet_friendly", label: "Pet Friendly", icon: <SparklesIcon className="h-5 w-5" /> },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string);
          if (newPreviews.length === files.length) {
            setPreviewImages([...previewImages, ...newPreviews]);
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...previewImages];
    newImages.splice(index, 1);
    setPreviewImages(newImages);
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...form,
        amenities,
      };

      await api.post("/properties", propertyData);
      router.push("/");
    } catch (err) {
      alert("Erro ao criar imóvel");
      console.error(err);
    }
  };

  // MODERN STEP BAR
  const StepBar = () => (
    <div className="relative flex items-center justify-between mb-10">
      {[1, 2, 3, 4].map((s, i) => (
        <div key={s} className="flex-1 flex flex-col items-center z-10">
          <div
            className={`flex items-center justify-center rounded-full w-10 h-10 border-2 transition-all duration-300
              ${step === s
                ? "bg-teal-50 border-teal-500 shadow text-teal-700 scale-110"
                : step > s
                  ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
          >
            {step > s ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <span className="text-lg font-bold">{s}</span>
            )}
          </div>
          <span
            className={`mt-2 text-xs font-medium transition-all duration-300 
              ${step === s ? "text-teal-700" : "text-gray-400"}`}
          >
            {["Básico", "Detalhes", "Fotos", "Preço"][i]}
          </span>
        </div>
      ))}
      {/* linha de conexão */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-200 via-amber-100 to-amber-200 -z-10 rounded-full" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full transition-all duration-500 z-0"
        style={{
          width: `${((step - 1) / 3) * 100}%`,
        }}
      />
    </div>
  );

  // MODERN FORM
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fadein space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-teal-700 mb-1">Informações básicas</h2>
              <p className="text-gray-500 text-sm">Preencha os principais dados do seu anúncio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-semibold text-teal-700 mb-1">Título*</label>
                <input
                  placeholder="Ex: Studio charmoso em Copacabana"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-gray-50"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  maxLength={60}
                />
                <p className="mt-1 text-xs text-gray-400">Destaque pontos fortes do seu espaço</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-teal-700 mb-1">Tipo de propriedade*</label>
                <select
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-sm"
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-teal-700 mb-1">Descrição*</label>
                <textarea
                  placeholder="Fale sobre diferenciais, atmosfera e localização..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-gray-50 h-28 resize-none"
                  required
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  maxLength={360}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block text-xs font-semibold text-teal-700 mb-1">Endereço*</label>
                <input
                  placeholder="Rua, número, bairro"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-sm"
                  required
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-teal-700 mb-1">Cidade*</label>
                <input
                  placeholder="Ex: Salvador"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-sm"
                  required
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-teal-700 mb-1">Estado*</label>
                <input
                  placeholder="Ex: BA"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-sm"
                  required
                  value={form.state}
                  onChange={e => setForm({ ...form, state: e.target.value })}
                  maxLength={2}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fadein space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-teal-700 mb-1">Detalhes do espaço</h2>
              <p className="text-gray-500 text-sm">Capacidade, cômodos e facilidades do seu imóvel.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  label: "Hóspedes",
                  icon: <UserGroupIcon className="h-6 w-6 text-teal-600" />,
                  value: form.maxGuests,
                  setValue: (v: number) => setForm({ ...form, maxGuests: v }),
                  min: 1,
                },
                {
                  label: "Quartos",
                  icon: <HomeIcon className="h-6 w-6 text-teal-600" />,
                  value: form.bedrooms,
                  setValue: (v: number) => setForm({ ...form, bedrooms: v }),
                  min: 1,
                },
                {
                  label: "Banheiros",
                  icon: <BuildingOfficeIcon className="h-6 w-6 text-teal-600" />,
                  value: form.bathrooms,
                  setValue: (v: number) => setForm({ ...form, bathrooms: v }),
                  min: 1,
                },
              ].map(({ label, icon, value, setValue, min }, idx) => (
                <div
                  className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-amber-50 p-4 flex flex-col items-center shadow-sm"
                  key={label}
                >
                  <div className="flex items-center gap-2 mb-2">{icon} <span className="font-medium text-teal-800">{label}</span></div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 active:scale-95 transition disabled:opacity-30"
                      disabled={value <= min}
                      onClick={() => setValue(value - 1)}
                    >-</button>
                    <span className="font-semibold text-xl text-gray-800">{value}</span>
                    <button
                      type="button"
                      className="bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 active:scale-95 transition"
                      onClick={() => setValue(value + 1)}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Comodidades disponíveis</h3>
              <p className="text-xs text-gray-500 mb-4">Clique nas opções oferecidas no seu espaço</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
                {availableAmenities.map((amenity) => (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`group flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition
                      ${amenities.includes(amenity.id)
                        ? "bg-teal-50 border-teal-500 text-teal-700 shadow"
                        : "bg-white border-gray-200 hover:border-teal-400 text-gray-700"
                      }`}
                  >
                    <div className="mb-1">{amenity.icon}</div>
                    <span className="text-xs">{amenity.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fadein space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-teal-700 mb-1">Fotos do imóvel</h2>
              <p className="text-gray-500 text-sm">Capriche nas imagens — elas vendem seu anúncio!</p>
            </div>
            <div
              className="border-2 border-dashed border-teal-300 rounded-2xl p-8 text-center hover:border-teal-500 transition-colors cursor-pointer group bg-gradient-to-br from-white to-teal-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
              <PhotoIcon className="h-14 w-14 mx-auto mb-2 text-teal-300 group-hover:text-teal-500 transition" />
              <h3 className="text-lg font-bold mb-1 text-teal-700">Clique para selecionar até 10 fotos</h3>
              <p className="text-xs text-gray-500">
                Imagens em alta resolução <span className="font-semibold text-teal-600">(JPEG ou PNG)</span>
              </p>
              <button
                type="button"
                className="mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 shadow transition"
              >
                Selecionar fotos
              </button>
            </div>
            {previewImages.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3">Pré-visualização</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden shadow border border-gray-200">
                      <img src={src} alt={`Preview ${index + 1}`} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); removeImage(index); }}
                        className="absolute top-2 right-2 bg-white/90 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        title="Remover"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="animate-fadein space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-teal-700 mb-1">Preço e taxas</h2>
              <p className="text-gray-500 text-sm">Defina o valor por noite e a taxa de limpeza.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-semibold text-teal-700 mb-1">Preço por noite (R$)*</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 font-bold">R$</span>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg bg-gray-50 font-semibold"
                    required
                    min="1"
                    value={form.pricePerNight}
                    onChange={e => setForm({ ...form, pricePerNight: Number(e.target.value) })}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Valor cobrado por noite hospedada.
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-teal-700 mb-1">Taxa de limpeza (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 font-bold">R$</span>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg bg-gray-50 font-semibold"
                    min="0"
                    value={form.cleaningFee}
                    onChange={e => setForm({ ...form, cleaningFee: Number(e.target.value) })}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Valor único cobrado por reserva para limpeza.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <SparklesIcon className="h-6 w-6 text-amber-500" />
              <span className="text-amber-700 text-sm">
                <span className="font-bold">Sugestão:</span> imóveis semelhantes cobram entre <span className="font-semibold">R$120</span> e <span className="font-semibold">R$180</span> por noite.
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-gray-700">Total por noite (com taxas):</span>
                <span className="font-bold text-teal-700">
                  R$ {Number(form.pricePerNight) + Number(form.cleaningFee)}
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // MODERN HEADER (Opcional)
  // Pode comentar o bloco header se não quiser, mas fica bonito igual UrbanHost
  const Header = () => (
    <header className="sticky top-0 z-30 bg-white shadow-sm mb-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <HomeIcon className="h-8 w-8 text-teal-600" />
          <span className="text-xl font-bold text-teal-600 tracking-tight">
            Urban<span className="text-amber-500">Host</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-600 text-sm font-medium">
            Precisa de ajuda? <a href="mailto:suporte@urbanhost.com" className="text-teal-600 underline">Fale conosco</a>
          </span>
        </div>
      </div>
    </header>
  );

  // ---- MAIN RETURN -----
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f9f9fb] to-[#f4fbfa]">
      <Header />
      <div className="max-w-4xl mx-auto px-2 pb-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2">Anuncie seu espaço</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Transforme seu imóvel em uma fonte de renda extra, com total segurança, flexibilidade e visibilidade nacional.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all">
          <div className="px-4 pt-6 pb-2">
            <StepBar />
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-10">
            {renderStepContent()}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Voltar
                </button>
              ) : (
                <div></div>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-teal-600 hover:to-teal-700 transition"
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-amber-600 hover:to-amber-700 transition"
                >
                  Publicar anúncio
                </button>
              )}
            </div>
          </form>
        </div>
        {/* SUPERHOST BANNER */}
        <div className="mt-10 bg-gradient-to-r from-teal-50 to-amber-50 rounded-2xl p-8 shadow flex flex-col items-center">
          <div className="bg-gradient-to-r from-teal-500 to-amber-400 w-16 h-16 rounded-full flex items-center justify-center shadow mb-4">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-teal-900 mb-2">Torne-se um Superhost</h2>
          <p className="text-gray-600 mb-4 max-w-xl text-center">
            Como Superhost você ganha <span className="font-semibold text-amber-700">+40% de reservas</span>, ferramentas exclusivas, destaque nas buscas e suporte VIP.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-teal-600" /> +40% de reservas
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
              <HomeIcon className="h-5 w-5 text-amber-600" /> Ferramentas premium
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-purple-600" /> Destaque nos resultados
            </div>
          </div>
        </div>
      </div>
      {/* animação fadein css */}
      <style>{`
        .animate-fadein { animation: fadeInUp 0.6s cubic-bezier(.23,1.2,.32,1) }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
