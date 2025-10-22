import { HttpException } from '@nestjs/common';
import { HttpStatusCode, HttpStatusMessage } from '@common/enums';

export class NotFound extends HttpException {
    constructor(message: string | void) {
        super(
            { message: message ?? HttpStatusMessage[HttpStatusCode.NOT_FOUND] },
            HttpStatusCode.NOT_FOUND
        );
    }
}
