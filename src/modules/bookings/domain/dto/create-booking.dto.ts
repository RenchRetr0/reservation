import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, required: true })
    userId!: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true })
    eventId!: number;
}
