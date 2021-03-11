import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';

@InputType()
export class PaginationQueryDto {
	@IsOptional()
	@IsPositive()
	@Field()
	limit: number;

	@IsOptional()
	@IsPositive()
	@Field()
	offset: number;
}
