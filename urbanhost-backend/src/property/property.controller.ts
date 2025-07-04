// src/property/property.controller.ts
import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './create-property.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data: CreatePropertyDto, @Request() req) {
    return this.propertyService.create(data, req.user.userId);
  }
}
