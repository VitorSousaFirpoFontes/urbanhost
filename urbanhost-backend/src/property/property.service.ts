import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './create-property.dto';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePropertyDto, hostId: string) {
    return this.prisma.property.create({
      data: {
        ...data,
        hostId,
      },
    });
  }

  async findAll() {
    return this.prisma.property.findMany();
  }

  async findOne(id: string) {
    return this.prisma.property.findUnique({
      where: { id },
    });
  }
}
