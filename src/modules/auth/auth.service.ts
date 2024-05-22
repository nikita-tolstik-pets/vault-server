import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import * as sjcl from 'sjcl';
import * as crypto from 'node:crypto';
import { User } from '@prisma/client';

type SignUpPayload = {
  publicKey: string;
  vault: string;
};

type SignInPayload = {
  publicKey: string;
};

type SignInReturn = {
  vault: string;
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async encryptPublicKey(publicKey: string): Promise<string> {
    return crypto
      .createHash('sha256')
      .update(`${publicKey}:${process.env.SJCL_SECRET as any}`)
      .digest('hex');
  }

  async encryptVault(vault: string): Promise<string> {
    return JSON.stringify(sjcl.encrypt(process.env.SJCL_SECRET as any, vault));
  }

  async decryptVault(encryptedVault: string): Promise<string> {
    return sjcl.decrypt(process.env.SJCL_SECRET as any, JSON.parse(encryptedVault));
  }

  async signUp(payload: SignUpPayload): Promise<void> {
    const { publicKey, vault } = payload;
    const encryptedPublicKey = await this.encryptPublicKey(publicKey);
    const encryptedVault = await this.encryptVault(vault);

    await this.prisma.user.create({
      data: {
        encryptedPublicKey,
        encryptedVault,
      },
    });
  }

  async authenticate(publicKey: string): Promise<User> {
    const encryptedPublicKey = await this.encryptPublicKey(publicKey);

    const user = await this.prisma.user.findUnique({
      where: { encryptedPublicKey },
    });

    if (user) return user;

    throw new ForbiddenException();
  }

  async signIn(payload: SignInPayload): Promise<SignInReturn> {
    const user = await this.authenticate(payload.publicKey);

    return {
      vault: await this.decryptVault(user.encryptedVault),
    };
  }
}
