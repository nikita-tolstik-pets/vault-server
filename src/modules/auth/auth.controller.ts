import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { SignUpBody } from './dto/sign-up.body';
import { AuthService } from './auth.service';
import { AuthHeadersDto } from 'common/dto/auth-headers.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpBody, @Headers() headers: AuthHeadersDto) {
    await this.authService.signUp({ publicKey: headers['x-public-key'], vault: body.vault });
    return { success: true };
  }

  @Post('sign-in')
  async signIn(@Headers() headers: AuthHeadersDto, @Res() res: Response) {
    res.status(200).send(await this.authService.signIn({ publicKey: headers['x-public-key'] }));
  }
}
