import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { PropertyType } from './create-property.dto';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @IsOptional()
  @IsNumber()
  maxGuests?: number;

  @IsOptional()
  @IsNumber()
  pricePerNight?: number;

  @IsOptional()
  @IsNumber()
  cleaningFee?: number;
}
