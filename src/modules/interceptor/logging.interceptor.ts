import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { utc } from 'moment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(tap(() => this.log(context)));
	}

	log = (context: ExecutionContext) => {
		let now = utc().format('LLLL');
		console.log(
			`${now} : ${context.getClass().name}.${context.getHandler().name}`,
		);
	};
}
