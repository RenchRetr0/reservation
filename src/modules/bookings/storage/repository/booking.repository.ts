import { Injectable } from '@nestjs/common';
import { CreateBookingDto, ResultUserTotalBookingDto } from '@bookings/domain/dto';
import { BookingModel } from '@bookings/domain/model';
import { IBookingRepository } from '@bookings/domain/repository';
import { PaginatedResponse } from '@common/dto';
import { BaseApiResponse } from '@common/dto/base-api-response.dto';

@Injectable()
export class BookingRepository extends IBookingRepository {
    async findAll(): Promise<Array<BookingModel>> {
        const bookingsEntity = await this.repository.find({
            order: { id: 'DESC' },
            relations: { event: true },
        });
        return this.mapper.toDomainList(bookingsEntity);
    }

    async findAllWithPagination(
        limit: number,
        offset: number
    ): Promise<PaginatedResponse<BookingModel>> {
        const [bookingsEntity, total] = await this.repository.findAndCount({
            order: { id: 'DESC' },
            relations: { event: true },
            take: limit,
            skip: offset,
        });
        return { items: this.mapper.toDomainList(bookingsEntity), total, limit, offset };
    }

    async findAllByDateWithPaginate(
        startDate: Date,
        endDate: Date,
        limit: number
    ): Promise<Array<{ userId: string; totalBooking: number }>> {
        const userTotalBookingsResult: Array<{ userId: string; count: number }> =
            await this.repository
                .createQueryBuilder('booking')
                .select('booking.userId', 'userId')
                .addSelect('COUNT(*)', 'count')
                .where('booking.createAt BETWEEN :start AND :end', {
                    start: startDate,
                    end: endDate,
                })
                .groupBy('booking.userId')
                .orderBy('count', 'DESC')
                .limit(limit)
                .getRawMany();

        return userTotalBookingsResult.map((result) => {
            const dto = new ResultUserTotalBookingDto();
            dto.userId = result.userId;
            dto.totalBooking = +result.count;
            return dto;
        });
    }

    async findById(bookingId: number): Promise<BookingModel | null> {
        const bookingEntity = await this.repository.findOne({
            where: { id: bookingId },
            relations: { event: true },
        });
        return bookingEntity ? this.mapper.toDomain(bookingEntity) : null;
    }

    async findByUserIdAndEventId(userId: string, eventId: number): Promise<BookingModel | null> {
        const bookingEntity = await this.repository.findOne({
            where: {
                userId,
                eventId,
            },
            relations: { event: true },
        });
        return bookingEntity ? this.mapper.toDomain(bookingEntity) : null;
    }

    async create(createBookingDto: CreateBookingDto): Promise<BookingModel> {
        const bookingEntity = await this.repository.save(createBookingDto);
        return this.mapper.toDomain(bookingEntity);
    }

    async delete(bookingId: number): Promise<BaseApiResponse | void> {
        await this.repository.softDelete({ id: bookingId });
    }
}
