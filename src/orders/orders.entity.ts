import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { MenuEntity } from 'src/menus/menus.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class OrderEntity extends CommonEntity {
  @ApiProperty({
    description: '주문 번호',
    type: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  number: number;

  @ApiProperty({
    description: '주문 량(amount)',
    type: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  amount: number;

  @ApiProperty({
    description: '메뉴이름',
  })
  @OneToOne(() => MenuEntity, (menu) => menu.name)
  @IsNotEmpty()
  @IsString()
  name: string;
}
