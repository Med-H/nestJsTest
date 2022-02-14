import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainingDocument = Training & Document;

@Schema()
@ObjectType()
export class Training {
	@Field(() => String)
	name: string;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
