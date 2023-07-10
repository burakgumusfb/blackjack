import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schemas/schema.module';
import { HandService } from './hand.service';


@Module({
  imports: [SchemaModule],
  providers: [HandService],
  exports: [HandService],
})
export class HandModule { }
