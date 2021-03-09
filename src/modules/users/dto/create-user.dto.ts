import {
	IsInt,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	readonly name: string;

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
