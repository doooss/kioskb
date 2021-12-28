import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/managers/jwt/jwt.guard';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu-dto';
import { MenuEntity } from './menus.entity';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(
    private readonly menusService: MenusService,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  @ApiOperation({
    summary: '전체 메뉴 조회',
  })
  @Get('all')
  async findAllMenus() {
    return await this.menusService.findAllMenus();
  }

  @ApiOperation({
    summary: '메뉴 종류별 조회',
  })
  @Get('types/:id')
  async findMenusByMenuType(@Param('id') id: string) {
    return await this.menusService.findMenusByMenuType(id);
  }

  @ApiOperation({
    summary: '메뉴 등록',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menusService.create(createMenuDto);
  }

  @ApiOperation({
    summary: '메뉴 삭제',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.menusService.deleteMenuById(id);
  }
}
