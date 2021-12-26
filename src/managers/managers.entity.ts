import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ManagerEntity extends CommonEntity {
  @ApiProperty({
    description: 'e-mail(로그인 아이디로 사용)',
    type: 'string',
    example: 'ldy9212@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false, length: 30 })
  email: string;

  @ApiProperty({
    description: 'password',
    type: 'string',
    example: 'P@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false, length: 120 })
  password: string;

  @ApiProperty({
    description: 'grade (매니저등급)',
    type: 'number',
    example: 1,
    nullable: false,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Column({ type: 'int', nullable: false, default: 1 })
  grade: number;

  @ApiProperty({
    description: 'permissionLevel (권한등급)',
    type: 'number',
    example: 1,
    nullable: false,
    default: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Column({ type: 'int', nullable: false, default: 0 })
  permissionLevel: number;
}
