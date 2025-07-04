import { IsDateString, IsInt, IsUUID, Min } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  propertyId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  @Min(1)
  guests: number;
}
