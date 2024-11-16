import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { modules } from './modules';

@Module({
  imports: [DatabaseModule.forRoot({ debug: true }), ...modules],
})
export class AppModule {}
