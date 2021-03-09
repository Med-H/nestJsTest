import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';

@Module({
	imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
