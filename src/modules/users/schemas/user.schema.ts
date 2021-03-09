import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({
		type: String,
		required: true,
		message: 'needed name',
		default: 'guest',
		unique: true,
	})
	name: string;

	@Prop({ type: Number })
	age: number;

	@Prop()
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
