import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseModel} from './base.entity';
import {CategoryEntity} from './category.entity';
import {ProductSizeEntity} from './p-size.entity';

@Entity('product')
export class ProductEntity extends BaseModel {
  @PrimaryGeneratedColumn('identity', {
    type: 'bigint',
  })
  id: bigint;

  @Column()
  name: string;

  @Column({default: ''})
  image: string;

  @Column({default: ''})
  description: string;

  @Column()
  color: string;

  @Column()
  default_price: string;

  @OneToMany(() => ProductSizeEntity, (productSize) => productSize.product)
  productSizes: ProductSizeEntity[];

  @ManyToOne(() => CategoryEntity, (c) => c.id, {nullable: true})
  category: CategoryEntity;
}
