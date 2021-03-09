import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		this.usersService.create(createUserDto);
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', new ParseIntPipe()) id: number) {
		// get by ID logic
	}
}
