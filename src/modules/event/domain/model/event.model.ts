import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EventModel {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true })
    private readonly id!: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, required: true })
    private name!: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true })
    private totalSeats!: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ type: Number, required: false })
    private countBooking: number | null;

    @IsNotEmpty()
    @IsISO8601()
    @ApiProperty({ type: Date, required: true })
    private readonly createAt!: Date;

    @IsNotEmpty()
    @IsISO8601()
    @ApiProperty({ type: Date, required: true })
    private readonly updateAt!: Date;

    @IsOptional()
    @IsISO8601()
    @ApiProperty({ type: Date, required: false })
    private readonly deleteAt!: Date | null;

    constructor(
        id: number,
        name: string,
        totalSeats: number,
        countBooking: number | null,
        createAt: Date,
        updateAt: Date,
        deleteAt: Date | null
    ) {
        this.id = id;
        this.name = name;
        this.totalSeats = totalSeats;
        this.countBooking = countBooking;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }

    /**
     * Getters
     */
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getTotalSeats(): number {
        return this.totalSeats;
    }

    getCountBooking(): number | null {
        return this.countBooking;
    }

    getCreateAt(): Date {
        return this.createAt;
    }

    getUpdateAt(): Date {
        return this.updateAt;
    }

    getDeleteAt(): Date | null {
        return this.deleteAt;
    }

    /**
     * Setters
     */
    setName(name: string): void {
        this.name = name;
    }

    setTotalSeats(totalSeats: number): void {
        this.totalSeats = totalSeats;
    }
}
