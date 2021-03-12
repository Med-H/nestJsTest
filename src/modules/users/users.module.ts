import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from '../resolvers/users.resolver';
import { Training, TrainingSchema } from './schemas/training.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Training.name, schema: TrainingSchema },
		]),
	],
	controllers: [UsersController],
	providers: [UsersService, UsersResolver, UsersController],
	exports: [MongooseModule], // in order to be importable in other modules
})
export class UsersModule {}
