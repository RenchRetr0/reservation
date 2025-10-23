import { Provider } from '@nestjs/common';
import { CreateBookingUseCase } from '@bookings/domain/use-case/create';
import { GetBookingUseCase, GetBookingsUseCase } from '@bookings/domain/use-case/get';
import { DeleteBookingUseCase } from '@bookings/domain/use-case/delete';

export const BookingDomainProviders: Array<Provider> = [
    CreateBookingUseCase,
    GetBookingUseCase,
    GetBookingsUseCase,
    DeleteBookingUseCase,
];
