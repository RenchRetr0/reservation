import { Injectable } from '@nestjs/common';
import { IEventRepository } from '@event/domain/repository';
import { BadRequest } from '@common/errors';

@Injectable()
export class DeleteEventUseCase {
    constructor(private readonly eventRepository: IEventRepository) {}

    async delete(eventId: number): Promise<void> {
        try {
            await this.eventRepository.delete!(eventId);
        } catch (error) {
            console.error('DeleteEventUseCase ~ delete ~ error: ', error);
            throw new BadRequest('Cannot deleted Event. Try again.');
        }
    }
}
