import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (userExists) {
      throw new BadRequestException('Email já cadastrado!');
    }

    const hash = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatarUrl: data.avatarUrl,
        passwordHash: hash,
        role: data.role || 'GUEST'
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
      }
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            property: true,
          },
        },
        properties: {
          include: {
            images: true,
          },
        },
      },
    });
  }
}
