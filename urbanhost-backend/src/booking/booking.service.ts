import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria uma reserva
  async create(dto: CreateBookingDto, userId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    const nights =
      (new Date(dto.endDate).getTime() - new Date(dto.startDate).getTime()) /
      (1000 * 60 * 60 * 24);

    const totalPrice =
      nights * property.pricePerNight + (property.cleaningFee ?? 0);

    const booking = await this.prisma.booking.create({
      data: {
        propertyId: dto.propertyId,
        guestId: userId,
        checkIn: new Date(dto.startDate),
        checkOut: new Date(dto.endDate),
        totalPrice,
        status: 'CONFIRMED',
      },
    });

    return booking;
  }

  // Retorna reservas do usuário
  async findAllByUser(userId: string) {
    return this.prisma.booking.findMany({
      where: { guestId: userId },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            pricePerNight: true,
          },
        },
      },
      orderBy: {
        checkIn: 'desc',
      },
    });
  }

  // Retorna uma reserva específica do usuário
  async findOne(bookingId: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            pricePerNight: true,
          },
        },
      },
    });

    if (!booking || booking.guestId !== userId) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return booking;
  }
}
