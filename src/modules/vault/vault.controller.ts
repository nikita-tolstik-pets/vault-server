import { Body, Controller, Headers, Put } from '@nestjs/common';
import { VaultService } from './vault.service';
import { AuthHeadersDto } from 'common/dto/auth-headers.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';

@Controller('vault')
export class VaultController {
  constructor(private vaultService: VaultService) {}

  @Put('/')
  async updateVault(@Headers() headers: AuthHeadersDto, @Body() body: UpdateVaultDto) {
    await this.vaultService.updateVault({
      publicKey: headers['x-public-key'],
      vault: body.vault,
    });
  }
}
