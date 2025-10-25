import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetByMonthDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true, minimum: 1901, example: 2025 })
    year: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true, minimum: 1, example: 1 })
    month: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true, minimum: 1, example: 10 })
    limit: number;
}
