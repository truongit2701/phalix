import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseModel} from './base.entity';
import {ProductEntity} from './product.entity';
import {SizeEntity} from './size.entity';

@Entity('product_size')
export class ProductSizeEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: bigint;

  @ManyToOne(() => ProductEntity, (p) => p.id)
  product: ProductEntity;

  @ManyToOne(() => SizeEntity, (m) => m.id)
  size: SizeEntity;
}
