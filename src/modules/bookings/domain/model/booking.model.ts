import { EventModel } from '@event/domain/model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookingModel {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true })
    private readonly id!: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, required: true })
    private userId!: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, required: true })
    private eventId!: number;

    @IsOptional()
    @Type(() => EventModel)
    @ApiPropertyOptional({ type: () => EventModel, required: false })
    private eventModel!: EventModel | null;

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
        userId: string,
        eventId: number,
        eventModel: EventModel | null,
        createAt: Date,
        updateAt: Date,
        deleteAt: Date | null
    ) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.eventModel = eventModel;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }

    /**
     * Getter
     */
    getId(): number {
        return this.id;
    }

    getUserId(): string {
        return this.userId;
    }

    getEventId(): number {
        return this.eventId;
    }

    getEvent(): EventModel | null {
        return this.eventModel;
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
     * Setter
     */
    setUserId(userId: string) {
        this.userId = userId;
    }

    setEventId(eventId: number) {
        this.eventId = eventId;
    }
}
