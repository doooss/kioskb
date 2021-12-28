import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager-dto';
import { ManagerEntity } from './managers.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInManagerDto } from './dto/sign-in-manager-dto';
import { ManagerDto } from './dto/manager.dto';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createManagerDto: CreateManagerDto): Promise<void> {
    const { email, password } = createManagerDto;
    const manager = await this.managerRepository.findOne({ email });
    if (manager) throw new UnauthorizedException('이미 등록된 이메일입니다');
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALTOFROUND),
    );
    const registerManager = { ...createManagerDto, password: hashedPassword };
    await this.managerRepository.save(registerManager);
  }

  async findManagerById(id: string) {
    try {
      const manager = await this.managerRepository.findOne({ id });
      if (!manager) throw new Error();
      return manager;
    } catch (err) {
      throw new BadRequestException('해당하는 유저를 찾을수 없습니다');
    }
  }

  async verifyManagerAndSignInJwt(
    email: SignInManagerDto['email'],
    password: SignInManagerDto['password'],
  ): Promise<{ jwt: string; manager: ManagerDto }> {
    const manager = await this.managerRepository.findOne({ email });
    if (!manager) throw new UnauthorizedException('이메일을 확인해주세요');
    if (!(await bcrypt.compare(password, manager.password)))
      throw new UnauthorizedException('비밀번호를 확인해주세요');

    const managerInfo = {
      email: manager.email,
      grade: manager.grade,
      permissionLevel: manager.permissionLevel,
      id: manager.id,
    };
    try {
      const jwt = await this.jwtService.signAsync(
        { sub: manager.id },
        { secret: process.env.SECRET_KEY },
      );
      return { jwt, manager: managerInfo };
    } catch (err) {
      throw new BadRequestException(err.mmessage);
    }
  }

  async deleteMagagerById(id: string) {
    const manager = await this.managerRepository.findOne({ id });
    if (!manager) throw new UnauthorizedException('올바르지 않은 접근입니다');

    await this.managerRepository.remove(manager);
  }
}
