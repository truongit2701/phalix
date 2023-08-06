import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';
import {ProductEntity} from './product.entity';
import {BaseModel} from './base.entity';

@Entity('cart')
export class CartEntity extends BaseModel {
  @PrimaryGeneratedColumn('identity', {
    type: 'bigint',
  })
  id: string;

  @Column()
  status: number;

  @ManyToOne(() => ProductEntity, (p) => p.id)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (u) => u.id)
  user: UserEntity;
}
