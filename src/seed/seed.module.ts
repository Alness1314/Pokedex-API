import { Module } from '@nestjs/common';
import { SeedService } from './services/seed.service';
import { SeedController } from './controllers/seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
