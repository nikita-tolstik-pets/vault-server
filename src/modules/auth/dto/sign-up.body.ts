import { IsString } from 'class-validator';

export class SignUpBody {
  @IsString()
  vault: string;
}
