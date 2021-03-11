import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
	@Prop({
		type: String,
		required: true,
		message: 'needed name',
		default: 'guest',
		unique: true,
	})
	@Field()
	name: string;

	@Prop({ type: Number })
	@Field()
	age: number;

	@Prop()
	@Field()
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
