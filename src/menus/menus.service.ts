import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu-dto';
import { MenuEntity } from './menus.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<void> {
    const { name } = createMenuDto;
    const menu = await this.menuRepository.findOne({ name });
    if (menu)
      throw new UnauthorizedException('해당하는 메뉴는 이미 존재합니다');

    await this.menuRepository.save(createMenuDto);
  }

  async findMenuById(id: string) {
    try {
      const menu = await this.menuRepository.findOne({ id });
      if (!menu) throw new Error();
      return menu;
    } catch (error) {
      throw new BadRequestException('해당하는 메뉴를 찾을수 없습니다');
    }
  }

  async findMenusByMenuType(MenuType: string) {
    try {
      const menu = await this.menuRepository.find({
        select: ['name', 'menuType', 'price', 'imgurl'],
        where: { menuType: MenuType },
      });

      if (!menu) throw new Error();
      return menu;
    } catch (error) {
      throw new BadRequestException(
        '해당하는 타입의 제품이 등록되지 않았습니다',
      );
    }
  }

  async findAllMenus() {
    const menu = await this.menuRepository.find();
    if (!menu) throw new UnauthorizedException('메뉴가 존재하지 않습니다');
    return menu;
  }

  async deleteMenuById(id: string) {
    const menu = await this.menuRepository.findOne({ id });
    if (!menu)
      throw new UnauthorizedException('해당하는 메뉴가 존재하지 않습니다');
    await this.menuRepository.remove(menu);
  }
}
