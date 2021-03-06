import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuEntity } from './menus/menus.entity';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { ManagersModule } from './managers/managers.module';
import { ManagerEntity } from './managers/managers.entity';
import { OrderEntity } from './orders/orders.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ID,
      password: process.env.MYSQL_PW,
      database: process.env.MYSQL_DATABASE,
      entities: [MenuEntity, ManagerEntity, OrderEntity],
      synchronize: true,
    }),
    MenusModule,
    OrdersModule,
    ManagersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
