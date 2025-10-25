import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResultUserTotalBookingDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, required: true })
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true })
    totalBooking: number;
}
