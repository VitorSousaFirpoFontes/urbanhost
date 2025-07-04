import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaModule } from '../prisma/prisma.module'; // adicione esse import!

@Module({
  imports: [PrismaModule], // adicione PrismaModule aqui
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
