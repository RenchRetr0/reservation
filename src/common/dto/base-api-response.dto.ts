import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class BaseApiResponse {
    @ApiProperty({
        oneOf: [
            { type: 'boolean', example: true },
            { type: 'string', example: 'ok' },
        ],
    })
    @IsNotEmpty()
    @ValidateIf((o) => typeof (o as BaseApiResponse).result === 'boolean')
    @IsBoolean()
    @ValidateIf((o) => typeof (o as BaseApiResponse).result === 'string')
    @IsString()
    result!: boolean | string;
}
