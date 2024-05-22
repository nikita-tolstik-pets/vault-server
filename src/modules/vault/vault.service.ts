import { Injectable } from '@nestjs/common';
import { AuthService } from 'modules/auth/auth.service';
import { PrismaService } from 'modules/prisma/prisma.service';

type UpdateVaultPayload = {
  publicKey: string;
  vault: string;
};

@Injectable()
export class VaultService {
  constructor(private prisma: PrismaService, private authService: AuthService) {}

  async updateVault(payload: UpdateVaultPayload) {
    const { encryptedPublicKey } = await this.authService.authenticate(payload.publicKey);
    const encryptedVault = await this.authService.encryptVault(payload.vault);

    await this.prisma.user.update({ where: { encryptedPublicKey }, data: { encryptedVault } });
  }
}
