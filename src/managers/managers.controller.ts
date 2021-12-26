import { Body, Controller, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager-dto';
import { SignInManagerDto } from './dto/sign-in-manager-dto';
import { ManagerEntity } from './managers.entity';
import { ManagersService } from './managers.service';

@Controller('managers')
export class ManagersController {
  constructor(
    private readonly managersService: ManagersService,
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,
  ) {}

  @Post('signup')
  async create(@Body() createManagerDto: CreateManagerDto) {
    return await this.managersService.register(createManagerDto);
  }
  @Post('signin')
  async signIn(
    @Body() signInManagerDto: SignInManagerDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { jwt, manager } =
      await this.managersService.verifyManagerAndSignInJwt(
        signInManagerDto.email,
        signInManagerDto.password,
      );
    response.cookie('jwt', jwt, { httpOnly: true });
    return manager;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
  }
}
