import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { TeamModule } from './modules/team/team.module';
import { PlayerModule } from './modules/player/player.module';
import { TransferModule } from './modules/transfer/transfer.module';
import * as config from 'config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    LoggerModule.forRoot(),
    MongooseModule.forRoot(config.get('mongodb.uri')),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    TeamModule,
    PlayerModule,
    TransferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
