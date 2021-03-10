import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
	catch(exception: MongoError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		if (exception.code === 11000) {
			return response.status(400).json({
				statusCode: 400,
				createdBy: 'ValidationErrorFilter',
				errors: exception,
			});
		}
	}
}
