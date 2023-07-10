import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./environments/.env.${process.env.NODE_ENV}` || '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
  ],
  exports: [ConfigModule, MongooseModule],
})
export class CustomConfigModule {}
