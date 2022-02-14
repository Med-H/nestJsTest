import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';
@ArgsType()
@InputType()
export class PaginationQueryDto {
	@IsOptional()
	@IsPositive()
	@Field(() => Number)
	limit: number;

	@IsOptional()
	@IsPositive()
	@Field(() => Number)
	offset: number;
}
