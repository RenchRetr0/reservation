import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateEventUseCase } from '@event/domain/use-case/create';
import { DeleteEventUseCase } from '@event/domain/use-case/delete';
import { GetEventsUseCase, GetEventUseCase } from '@event/domain/use-case/get';
import { UpdateEventUseCase } from '@event/domain/use-case/update';
import { CreateEventDto, UpdateEventDto } from '@event/domain/dto';
import { EventModel } from '@event/domain/model';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('Event')
export class EventController {
    constructor(
        private readonly createEventUseCase: CreateEventUseCase,
        private readonly getEventUseCase: GetEventUseCase,
        private readonly getEventsUseCase: GetEventsUseCase,
        private readonly updateEventUseCase: UpdateEventUseCase,
        private readonly deleteEventUseCase: DeleteEventUseCase
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create event.' })
    @ApiBody({ description: 'Event created', type: CreateEventDto })
    @ApiResponse({ status: 201, description: 'Event created' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async createEvent(@Body() createEventDto: CreateEventDto): Promise<void> {
        await this.createEventUseCase.create(createEventDto);
        return;
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get list event' })
    @ApiResponse({
        status: 200,
        description: 'List of events retrieved successfully',
        type: EventModel,
        isArray: true,
    })
    async getEvents(): Promise<Array<EventModel>> {
        return await this.getEventsUseCase.getAll();
    }

    @Get('by/:id')
    @ApiOperation({ summary: 'Get event by ID' })
    @ApiResponse({ status: 200, description: 'Event retrieved successfully', type: EventModel })
    @ApiResponse({ status: 404, description: 'Event not found' })
    async getById(@Param('id', ParseIntPipe) eventId: number): Promise<EventModel> {
        return await this.getEventUseCase.getByIdOrError(eventId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update event by ID' })
    @ApiBody({ description: 'Updated event data', type: UpdateEventDto })
    @ApiResponse({ status: 200, description: 'Event updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    async updateEvent(
        @Param('id', ParseIntPipe) eventId: number,
        @Body() updateEventDto: UpdateEventDto
    ): Promise<void> {
        await this.updateEventUseCase.update(eventId, updateEventDto);
        return;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete event by ID' })
    @ApiResponse({ status: 200, description: 'Event deleted successfully' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async deleteEvent(@Param('id', ParseIntPipe) eventId: number): Promise<void> {
        return await this.deleteEventUseCase.delete(eventId);
    }
}
