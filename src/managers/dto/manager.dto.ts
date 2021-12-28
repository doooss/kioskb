import { PickType } from '@nestjs/swagger';
import { ManagerEntity } from '../managers.entity';

export class ManagerDto extends PickType(ManagerEntity, [
  'email',
  'grade',
  'permissionLevel',
  'id',
] as const) {}
