import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CartEntity} from 'src/entities/order.entity';
import {ProductEntity} from 'src/entities/product.entity';
import {CartController} from './cart.controller';
import {CartService} from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CartEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
