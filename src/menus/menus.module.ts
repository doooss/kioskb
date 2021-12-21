import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusController } from './menus.controller';
import { MenuEntity } from './menus.entity';
import { MenusService } from './menus.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
