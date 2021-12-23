import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';
import { MenuType } from './menu.type';

@Entity()
export class MenuEntity extends CommonEntity {
  @ApiProperty({
    description: '메뉴 이름',
    type: 'string',
    example: '와퍼',
  })
  @IsString()
  @IsNotEmpty({ message: '메뉴 이름을 입력하지 않았습니다' })
  @Column({ type: 'varchar', nullable: false, length: 30 })
  name: string;

  @ApiProperty({
    description: '제품 종류',
    type: 'main / sub / drink',
    example: 'main',
  })
  @IsString()
  @IsNotEmpty({ message: '제품 타입을 입력하지 않았습니다' })
  @Column({ type: 'varchar', nullable: false, length: 30 })
  menuType: MenuType;

  @ApiProperty({
    description: '판매량',
    type: 'number',
    default: 0,
  })
  @IsNumber()
  @Column({ type: 'int', default: 0 })
  cumulativeSales: number;

  @ApiProperty({
    description: '가격',
    type: 'number',
    example: 5000,
  })
  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력하지 않았습니다' })
  @Column({ type: 'int', nullable: false })
  price: number;

  @ApiProperty({
    description: '이미지 경로',
    type: 'string',
    example:
      'https://lh3.googleusercontent.com/pw/AM-JKLXOPl-s_Zg1LRK87C3jo2IPMM9buKNSCoMrf_WWMRS1COQ2tmUr_cdl7odUEGPLLg6XX7gnnT5d9hTXO_-ZReak7DJhXvjqfBgv5mpYCBbbntivoiZG0sZkDPqfVrO8QeeJz48QOKhaQ37u55Iy0mvW=w504-h330-no?authuser=0',
  })
  @IsUrl()
  @Column({ type: 'varchar', length: 512 })
  imgurl: string;
}
