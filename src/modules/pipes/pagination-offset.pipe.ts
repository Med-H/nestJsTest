import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { PaginationQueryDto } from '../users/dto/pagination-user.dto';

@Injectable()
export class ParsePagination
	implements PipeTransform<any, Promise<PaginationQueryDto>> {
	async transform(
		{ limit, offset }: any,
		_argumentMetadata: ArgumentMetadata,
	): Promise<PaginationQueryDto> {
		limit = this.getLimit(limit);
		offset = this.getOffset(offset);

		return { limit, offset };
	}

	private getOffset(offset: number): number {
		offset = this.convertToNumber(offset);
		return offset < 0 || isNaN(offset) ? 0 : offset;
	}

	private getLimit(limit: number): number {
		limit = this.convertToNumber(limit);
		switch (true) {
			case isNaN(limit):
			case limit < 0:
				limit = 1;
				break;
			case limit > 20:
				limit = 20;
				break;
			default:
				break;
		}
		return limit;
	}

	private convertToNumber = (n: string | number): number => {
		return parseInt(String(n));
	};

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
