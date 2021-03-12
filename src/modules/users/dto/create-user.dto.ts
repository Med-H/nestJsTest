import {
	IsInt,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
class BaseDto {
	constructor(name: string) {
		this.name = name;
	}

	@IsString()
	readonly name: string;
}
export class CreateUserDto extends BaseDto {
	@IsInt()
	readonly age: number;

	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak',
	})
	readonly password: string;
}

export class CreateTrainingDto extends BaseDto {
	constructor(name: string, training: string) {
		super(name);
		this.training = training;
	}

	@IsString()
	readonly training: string;
}

export class FindUserDto extends BaseDto {}
export class UpdateUserDto extends BaseDto {}
export class DeleteUserDto extends BaseDto {}
