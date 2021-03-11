import { Field, InputType, Int } from '@nestjs/graphql';
import {
	IsInt,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
@InputType()
class BaseDto {
	constructor(name: string) {
		this.name = name;
	}

	@Field()
	@IsString()
	readonly name: string;
}
export class CreateUserDto extends BaseDto {
	@Field(() => Int)
	@IsInt()
	readonly age: number;

	@Field(() => Int)
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak',
	})
	readonly password: string;
}

export class FindUserDto extends BaseDto {}
export class UpdateUserDto extends BaseDto {}
export class DeleteUserDto extends BaseDto {}
