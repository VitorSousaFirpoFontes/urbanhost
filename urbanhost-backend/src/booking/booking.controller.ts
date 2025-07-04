import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Criar nova reserva
  @Post()
  async create(@Body() dto: CreateBookingDto, @Request() req) {
    const userId = req.user.userId;
    return this.bookingService.create(dto, userId);
  }

  // Listar reservas do usuário autenticado
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    return this.bookingService.findAllByUser(userId);
  }

  // Buscar uma reserva específica do usuário
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.bookingService.findOne(id, userId);
  }
}
