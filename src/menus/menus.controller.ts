import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  @Get('all')
  async findAllMenus() {
    return await this.menusService.findAllMenus();
  }
  @Get('types/:id')
  async findMenusByMenuType(@Param('id') id: string) {
    return await this.menusService.findMenusByMenuType(id);
  }

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menusService.create(createMenuDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.menusService.deleteMenuById(id);
  }
}
