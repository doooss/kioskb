import { PickType } from '@nestjs/swagger';
import { ManagerEntity } from '../managers.entity';

export class CreateManagerDto extends PickType(ManagerEntity, [
  'email',
  'password',
] as const) {}
