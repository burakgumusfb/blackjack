import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schemas/schema.module';
import { MigrationService } from './migration.service';

@Module({
  imports: [SchemaModule],
  providers: [MigrationService],
  exports: [MigrationService],
})
export class MigrationModule {}
