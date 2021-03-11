import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UseFilters,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import {
	CreateUserDto,
	FindUserDto,
	UpdateUserDto,
} from './dto/create-user.dto';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import { PaginationQueryDto } from './dto/pagination-user.dto';
import { ParsePagination } from '../pipes/pagintion-offset.pipe';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@UseFilters(MongoExceptionFilter)
	@HttpCode(201)
	async create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get('/all')
	async findAll(
		@Query(new ParsePagination()) paginationQueryDto: any,
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
		return this.usersService.delete(new FindUserDto(name));
	}
}
