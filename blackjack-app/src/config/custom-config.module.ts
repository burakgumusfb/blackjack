import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./environments/.env.${process.env.NODE_ENV}` || '.env',
    }),
    HttpModule.register({
      baseURL: process.env.API_URL,
      timeout: 100000,
      maxRedirects: 5,
    }),
  ],
  exports: [HttpModule, ConfigModule],
})
export class CustomConfigModule { }
