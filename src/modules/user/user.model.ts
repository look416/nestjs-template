import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.interface';

export type UserDocument = UserModel & Document;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class UserModel implements User {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ index: -1 })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
