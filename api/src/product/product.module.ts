import {Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {ProductController} from './product.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductEntity} from 'src/entities/product.entity';
import {ProductMaterialEntity} from 'src/entities/p-material.entity';
import {ProductSizeEntity} from 'src/entities/p-size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductMaterialEntity,
      ProductSizeEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
