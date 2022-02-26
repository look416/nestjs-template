import { UserModel, UserDocument } from './user.model';
import { Injectable } from '@nestjs/common';
import { Ulid } from 'id128';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName } from '../event/event.constant';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return (await this.userModel.findOne({ username }))?.toObject();
  }

  async create(username: string, password: string): Promise<User> {
    let userId = Ulid.generate().toCanonical();
    let hashed = await bcrypt.hash(password, 10);
    const {password: _, ...result} = (await this.userModel.create({ userId, username, password: hashed })).toObject();
    await this.postRegistration(result);
    return result;
  }

  async postRegistration(user: User): Promise<void> {
    this.eventEmitter.emit(EventName.USER_REGISTERED, user);
  }
}
