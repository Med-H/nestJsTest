import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			debug: false,
			playground: true,
			sortSchema: true,
			autoSchemaFile: 'schema.gql',
		}),
		MongooseModule.forRoot('mongodb://localhost/nest'),
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
