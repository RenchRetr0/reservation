import { IsNotEmpty, IsNumber } from 'class-validator';
import { GetByMonthDto } from './get-by-month.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetByMonthAndWeekDto extends GetByMonthDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true, minimum: 1, example: 1 })
    week: number;
}
