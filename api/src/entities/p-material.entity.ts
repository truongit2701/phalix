import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.entity";
import { ProductEntity } from "./product.entity";
import { MaterialEntity } from "./material.entity";

@Entity('product_material')
export class ProductMaterialEntity extends BaseModel {
      @PrimaryGeneratedColumn()
      id: bigint

      @ManyToOne(() => ProductEntity, (p) => p.id)
      product: ProductEntity

      @ManyToOne(() => MaterialEntity, (m) => m.id)
      material: MaterialEntity
}
