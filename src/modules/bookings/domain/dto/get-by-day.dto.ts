import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class GetByDayDto {
    @IsNotEmpty()
    @IsISO8601()
    @ApiProperty({ type: String, required: true, example: '2025.10.25' })
    dateDayString: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true, minimum: 1, example: 10 })
    limit: number;
}
