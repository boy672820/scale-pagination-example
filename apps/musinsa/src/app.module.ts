import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { modules } from './modules';

@Module({
  imports: [DatabaseModule.forRoot(), ...modules],
})
export class AppModule {}
