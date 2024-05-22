import { IsString } from 'class-validator';

export class AuthHeadersDto {
  @IsString()
  'x-public-key': string;
}
