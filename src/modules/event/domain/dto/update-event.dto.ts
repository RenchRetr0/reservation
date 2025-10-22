import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: String })
    name?: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ type: Number })
    totalSeats?: number;
}
