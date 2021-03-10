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
		@Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
	): Promise<User[]> {
		const paginationQueryDto = new PaginationQueryDto();
		paginationQueryDto.limit = limit;
		paginationQueryDto.offset = offset;
		return this.usersService.findAll(paginationQueryDto);
	}

	@Put()
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
