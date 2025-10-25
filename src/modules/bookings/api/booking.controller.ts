import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { CreateBookingUseCase } from '@bookings/domain/use-case/create';
import { GetBookingsUseCase, GetBookingUseCase } from '@bookings/domain/use-case/get';
import { DeleteBookingUseCase } from '@bookings/domain/use-case/delete';
import {
    CreateBookingDto,
    GetByDayDto,
    GetByMonthAndWeekDto,
    GetByMonthDto,
    ResultUserTotalBookingDto,
} from '@bookings/domain/dto';
import {
    ApiBody,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BookingModel } from '@bookings/domain/model';
import { PaginatedRequestDto, PaginatedResponse } from '@common/dto';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
    constructor(
        private readonly createBookingUseCase: CreateBookingUseCase,
        private readonly getBookingsUseCase: GetBookingsUseCase,
        private readonly getBookingUseCase: GetBookingUseCase,
        private readonly deleteBookingUseCase: DeleteBookingUseCase
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create booking.' })
    @ApiBody({ description: 'Booking create', type: CreateBookingDto })
    @ApiResponse({ status: 201, description: 'Booking created' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<void> {
        await this.createBookingUseCase.create(createBookingDto);
        return;
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get list booking' })
    @ApiResponse({
        status: 200,
        description: 'List of booking retrieved successfully',
        type: PaginatedResponse<BookingModel>,
    })
    async getBookings(
        @Query() paginatedRequestDto: PaginatedRequestDto
    ): Promise<PaginatedResponse<BookingModel>> {
        const { limit, offset } = paginatedRequestDto;
        return await this.getBookingsUseCase.getAllWithPaginate(limit, offset);
    }

    @Get('month')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get bookings for the month',
        description: 'Returns an array of user bookings for the specified month and year.',
    })
    @ApiResponse({
        status: 200,
        description: 'Successful request. Returns an array of booking objects.',
        type: ResultUserTotalBookingDto,
        isArray: true,
    })
    async getByMonth(
        @Query() getByMonthDto: GetByMonthDto
    ): Promise<Array<ResultUserTotalBookingDto>> {
        return await this.getBookingsUseCase.getByMonth(getByMonthDto);
    }

    @Get('month-and-week')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get bookings for the week in the month',
        description:
            'Returns an array of user bookings for the specified week in the given month and year.',
    })
    @ApiResponse({
        status: 200,
        description: 'Successful request. Returns an array of booking objects.',
        type: ResultUserTotalBookingDto,
        isArray: true,
    })
    async getByMonthAndWeek(
        @Query() getByMonthAndWeekDto: GetByMonthAndWeekDto
    ): Promise<Array<ResultUserTotalBookingDto>> {
        return await this.getBookingsUseCase.getByMonthAndWeek(getByMonthAndWeekDto);
    }

    @Get('day')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get bookings for the day',
        description: 'Returns an array of user bookings for the specified day.',
    })
    @ApiResponse({
        status: 200,
        description: 'Successful request. Returns an array of booking objects.',
        type: ResultUserTotalBookingDto,
        isArray: true,
    })
    async getByDay(@Query() getByDayDto: GetByDayDto): Promise<Array<ResultUserTotalBookingDto>> {
        return await this.getBookingsUseCase.getByDay(getByDayDto);
    }

    @Get('by/userId/:eventId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get booking by user ID and event ID',
        description:
            'Retrieves a specific booking based on the provided user ID (from query) and event ID (from path parameter). Returns the booking details if found.',
    })
    @ApiQuery({
        name: 'userId',
        type: String,
        required: true,
        description: 'The unique identifier of the user (string format).',
    })
    @ApiParam({
        name: 'eventId',
        type: Number,
        required: true,
        description: 'The unique identifier of the event (integer).',
    })
    @ApiResponse({
        status: 200,
        description: 'Booking successfully retrieved.',
        type: BookingModel,
    })
    @ApiNotFoundResponse({
        description: 'Booking not found for the given user ID and event ID.',
    })
    async getByBookingIdAndEventId(
        @Query('userId') userId: string,
        @Param('eventId', ParseIntPipe) eventId: number
    ): Promise<BookingModel> {
        return await this.getBookingUseCase.getByUserIdAndEventIdOrError(userId, eventId);
    }

    @Get('by/:bookingId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'bookingId', type: Number })
    @ApiResponse({ status: 200, description: 'Booking retrieved successfully', type: BookingModel })
    @ApiResponse({ status: 404, description: 'Booking not found' })
    async getByBookingId(
        @Param('bookingId', ParseIntPipe) bookingId: number
    ): Promise<BookingModel> {
        return await this.getBookingUseCase.getByIdOrError(bookingId);
    }

    @Delete(':bookingId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete event by ID' })
    @ApiResponse({ status: 200, description: 'Event deleted successfully' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    async delete(@Param('bookingId', ParseIntPipe) bookingId: number): Promise<void> {
        return await this.deleteBookingUseCase.delete(bookingId);
    }
}
