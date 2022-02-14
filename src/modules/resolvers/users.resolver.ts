import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaginationQueryDto } from '../users/dto/pagination-user.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Resolver(() => User)
export class UsersResolver {
	constructor(
		@Inject(UsersService) private readonly itemsService: UsersService,
	) {}

	@Query(() => [User])
	async findAll(
		@Args('input')
		paginationQueryDto: PaginationQueryDto,
	): Promise<User[]> {
		return this.itemsService.findAll(paginationQueryDto);
	}
}
