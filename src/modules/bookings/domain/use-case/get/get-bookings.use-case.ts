import { Injectable } from '@nestjs/common';
import { BookingModel } from '@bookings/domain/model';
import { IBookingRepository } from '@bookings/domain/repository';
import { PaginatedResponse } from '@common/dto';
import {
    GetByDayDto,
    GetByMonthAndWeekDto,
    GetByMonthDto,
    ResultUserTotalBookingDto,
} from '@bookings/domain/dto';

@Injectable()
export class GetBookingsUseCase {
    constructor(private readonly bookingRepository: IBookingRepository) {}

    async getAll(): Promise<Array<BookingModel>> {
        return await this.bookingRepository.findAll();
    }

    async getAllWithPaginate(
        limit: number,
        offset: number
    ): Promise<PaginatedResponse<BookingModel>> {
        return await this.bookingRepository.findAllWithPagination(limit, offset);
    }

    async getByMonth(getByMonthDto: GetByMonthDto): Promise<Array<ResultUserTotalBookingDto>> {
        const { year, month, limit } = getByMonthDto;
        const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
        const endDate = new Date(year, month, 0);
        return await this.bookingRepository.findAllByDateWithPaginate(startDate, endDate, limit);
    }

    async getByMonthAndWeek(
        getByMonthAndWeekDto: GetByMonthAndWeekDto
    ): Promise<Array<ResultUserTotalBookingDto>> {
        const { year, month, week, limit } = getByMonthAndWeekDto;

        const firstDayOfMonth = new Date(Date.UTC(year, month - 1, 1));
        const firstDayWeekday = firstDayOfMonth.getUTCDay();

        // Находим первый понедельник месяца (или сам 1-й, если он понедельник)
        // Если 1-е — понедельник (1), смещение 0; если вторник (2), смещение -1 (назад к понедельнику);
        const offsetToMonday = firstDayWeekday === 0 ? -6 : 1 - firstDayWeekday;
        const firstMonday = new Date(Date.UTC(year, month - 1, 1 + offsetToMonday));

        const startDate = new Date(firstMonday.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
        const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

        return await this.bookingRepository.findAllByDateWithPaginate(startDate, endDate, limit);
    }

    async getByDay(getByDayDto: GetByDayDto): Promise<Array<ResultUserTotalBookingDto>> {
        const { dateDayString, limit } = getByDayDto;
        const dateDay = new Date(dateDayString);

        const year = dateDay.getFullYear();
        const month = dateDay.getMonth();
        const day = dateDay.getDate();

        const startDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
        const endDate = new Date(Date.UTC(year, month, day + 1, 0, 0, 0, 0));

        return await this.bookingRepository.findAllByDateWithPaginate(startDate, endDate, limit);
    }

    // async getAllByCreateAt(getByDateWithLimitDto: GetByDateWithLimitDto): Promise<any> {
    //         const { year, month, week, limit } = getByDateWithLimitDto;
    //         const startDate = new Date(year, month - 1, 1);
    //         const endDate = new Date(year, month, 0);
    //         if (week) {
    //             const dayOfWeek = startDate.getDay();
    //             console.log('Неделя: ', week);
    //             console.log('День недели: ', dayOfWeek);

    //             // Найти первый понедельник месяца (если неделя с понедельника)
    //             // Если dayOfWeek === 1 (понедельник), то 0 дней прибавить; иначе рассчитать смещение
    //             const offsetToMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
    //             const firstMonday = new Date(startDate);
    //             firstMonday.setDate(startDate.getDate() + offsetToMonday);

    //             // Начало недели: первый понедельник + (week - 1) * 7 дней
    //             const startOfWeek = new Date(firstMonday);
    //             startOfWeek.setDate(firstMonday.getDate() + (week - 1) * 7);

    //             // Конец недели: начало + 6 дней
    //             const endOfWeek = new Date(startOfWeek);
    //             endOfWeek.setDate(startOfWeek.getDate() + 6);

    //             console.log('Начало недели: ', startOfWeek);
    //             console.log('Конец недели: ', endOfWeek);
    //         }
    //         return this.bookingRepository.findAllByDateWithLimit(startDate, endDate, limit);
    //     }
}
