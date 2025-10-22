import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    public catch(exception: any, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const response: Response = context.getResponse<Response>();
        const request: Request = context.getRequest<Request>();
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const message = exception.getResponse();

            response.status(status).json({
                statusCode: status,
                message: message,
                path: request.path,
            });
            return;
        }
        if (typeof exception === 'object' && 'errorName' in exception) {
            response.status(400).json({
                statusCode: 500,
                ...exception,
                path: request.path,
            });
            return;
        }
        console.error('unknown error', exception);
        response.status(500).json({
            statusCode: 500,
            message: 'unknown error',
            path: request.path,
        });
    }
}
