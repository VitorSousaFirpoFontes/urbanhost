'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function CreatePropertyPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'HOUSE',
    maxGuests: 1,
    pricePerNight: 100,
    cleaningFee: 0,
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      await axios.post('/properties', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      alert('Imóvel cadastrado com sucesso!')
      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Erro ao cadastrar imóvel.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Imóvel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Tipo</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="HOUSE">Casa</option>
            <option value="APARTMENT">Apartamento</option>
            <option value="ROOM">Quarto</option>
            <option value="STUDIO">Estúdio</option>
            <option value="OTHER">Outro</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Máx. Hóspedes</label>
          <input
            type="number"
            name="maxGuests"
            value={form.maxGuests}
            onChange={handleChange}
            min={1}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Preço por Noite (R$)</label>
          <input
            type="number"
            name="pricePerNight"
            value={form.pricePerNight}
            onChange={handleChange}
            min={0}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Taxa de Limpeza (opcional)</label>
          <input
            type="number"
            name="cleaningFee"
            value={form.cleaningFee}
            onChange={handleChange}
            min={0}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
