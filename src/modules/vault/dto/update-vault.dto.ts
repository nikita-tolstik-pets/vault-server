import { IsString } from 'class-validator';

export class UpdateVaultDto {
  @IsString()
  vault: string;
}
