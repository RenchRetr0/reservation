import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, required: true })
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true })
    totalSeats!: number;
}
