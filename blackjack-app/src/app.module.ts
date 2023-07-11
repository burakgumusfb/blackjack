import { Module } from '@nestjs/common';
import { CustomConfigModule } from './config/custom-config.module';
import { BlackjackModule } from './modules/blackjack/blackjack.module';

@Module({
  imports: [CustomConfigModule, BlackjackModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
