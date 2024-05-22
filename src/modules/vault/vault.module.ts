import { Module } from '@nestjs/common';
import { VaultController } from './vault.controller';
import { VaultService } from './vault.service';
import { AuthService } from 'modules/auth/auth.service';

@Module({
  controllers: [VaultController],
  providers: [VaultService, AuthService],
})
export class VaultModule {}
