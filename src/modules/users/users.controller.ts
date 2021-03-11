import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UseFilters,
	UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import {
	CreateUserDto,
	DeleteUserDto,
	FindUserDto,
	UpdateUserDto,
} from './dto/create-user.dto';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import { ParsePagination } from '../pipes/pagination-offset.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@UseFilters(MongoExceptionFilter)
	@Roles('admin')
	@HttpCode(201)
	async create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get('/all')
	async findAll(
		@Query(ParsePagination) paginationQueryDto: any,
	): Promise<User[]> {
		return this.usersService.findAll(paginationQueryDto);
	}

	@Put()
	@UseFilters(MongoExceptionFilter)
	update(@Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(updateUserDto);
	}

	@Get(':name')
	findOne(@Param('name') name: string) {
		return this.usersService.findOne(new FindUserDto(name));
	}

	@Delete(':name')
	remove(@Param('name') name: string) {
		return this.usersService.delete(new DeleteUserDto(name));
	}
}
