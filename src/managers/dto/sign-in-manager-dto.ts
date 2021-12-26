import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsAscii, IsNotEmpty } from 'class-validator';
import { ManagerEntity } from '../managers.entity';

export class SignInManagerDto extends PickType(ManagerEntity, [
  'email',
] as const) {
  @ApiProperty({
    description: 'password(ASCII)',
    example: 'P@ssw0rd',
  })
  @IsAscii()
  @IsNotEmpty()
  password: string;
}
