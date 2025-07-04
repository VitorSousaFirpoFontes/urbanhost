import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  ROOM = 'ROOM',
  STUDIO = 'STUDIO',
  OTHER = 'OTHER'
}

export class CreatePropertyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsNumber()
  maxGuests: number;

  @IsNumber()
  pricePerNight: number;

  @IsOptional()
  cleaningFee?: number;
}
