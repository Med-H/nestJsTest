import { Get } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Resolver()
export class UsersResolver {
	constructor(private readonly itemsService: UsersService) {}

	@Get('/graphql')
	@Query(() => [User])
	async findAll(): Promise<User[]> {
		return this.itemsService.findAll({ offset: 0, limit: 0 });
	}
}
