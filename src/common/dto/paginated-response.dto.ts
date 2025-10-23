import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {
    @ApiProperty({
        description: 'List of items of the specified type',
        type: [Object],
    })
    items: T[];

    @ApiProperty({
        description: 'Total number of items in the list',
        example: 100,
        type: Number,
    })
    total: number;

    @ApiProperty({
        description: 'Limit of items per page for pagination',
        example: 15,
        type: Number,
    })
    limit: number;

    @ApiProperty({
        description: 'Offset used to fetch the data (pagination)',
        example: 0,
        type: Number,
    })
    offset: number;

    constructor(items: T[] = [], total = 0, limit = 0, offset = 0) {
        this.items = items;
        this.total = total;
        this.limit = limit;
        this.offset = offset;
    }

    static empty<U>(limit = 0, offset = 0): PaginatedResponse<U> {
        return new PaginatedResponse<U>([], 0, limit, offset);
    }
}
