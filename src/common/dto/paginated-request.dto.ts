import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginatedRequestDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true, minimum: 10 })
    limit: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true, minimum: 0 })
    offset: number;
}
