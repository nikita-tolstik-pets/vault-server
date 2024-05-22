import { Module } from '@nestjs/common';
import { PrismaModule } from 'modules/prisma/prisma.module';
import { VaultModule } from './modules/vault/vault.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, VaultModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
