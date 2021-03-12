import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import {
	CreateTrainingDto,
	CreateUserDto,
	DeleteUserDto,
	FindUserDto,
	UpdateUserDto,
} from './dto/create-user.dto';
import { PaginationQueryDto } from './dto/pagination-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);
		return createdUser.save();
	}

	async findAll(paginationQuery: PaginationQueryDto): Promise<User[]> {
		const { offset, limit } = paginationQuery;
		return this.userModel.find().skip(offset).limit(limit).exec();
	}

	async findOne(findUserDto: FindUserDto): Promise<User> {
		return this.userModel.findOne(findUserDto).exec();
	}

	async update(updateUserDto: UpdateUserDto): Promise<User> {
		return this.userModel
			.findOneAndUpdate(updateUserDto, { name: 'test 4' }, { new: true })
			.exec();
	}

	async delete(deleteUserDto: DeleteUserDto): Promise<any> {
		return this.userModel.deleteOne(deleteUserDto).exec();
	}

	async addReview(createTrainingDto: CreateTrainingDto) {
		return this.userModel
			.findOneAndUpdate(
				createTrainingDto as FindUserDto,
				{ review: createTrainingDto.training },
				{ new: true },
			)
			.exec();
	}
}
