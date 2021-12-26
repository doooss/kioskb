import { OmitType } from '@nestjs/swagger';
import { ManagerEntity } from '../managers.entity';

export class ManagerDto extends OmitType(ManagerEntity, [
  'password',
] as const) {}
