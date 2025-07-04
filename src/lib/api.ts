export async function fetchProperties() {
  const res = await fetch("http://localhost:3001/properties", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar propriedades");

  return res.json();
}

export async function fetchPropertyById(id: string) {
  const res = await fetch(`http://localhost:3001/properties/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar propriedade");

  return res.json();
}

export async function createReservation(
  data: {
    propertyId: string;
    startDate: string;
    endDate: string;
    guests: number;
  },
  token: string
) {
  const res = await fetch("http://localhost:3001/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar reserva");

  return res.json();
}

export async function fetchBookingById(id: string, token: string) {
  const res = await fetch(`http://localhost:3001/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar reserva");

  return res.json();
}
