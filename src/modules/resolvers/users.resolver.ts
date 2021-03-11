import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaginationQueryDto } from '../users/dto/pagination-user.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Resolver()
export class UsersResolver {
	constructor(private readonly itemsService: UsersService) {}

	@Query(() => [User])
	async findAll(
		@Args('input', { type: () => PaginationQueryDto })
		paginationQueryDto,
	): Promise<User[]> {
		return this.itemsService.findAll(paginationQueryDto);
	}
}
