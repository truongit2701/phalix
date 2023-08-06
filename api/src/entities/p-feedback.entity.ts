import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.entity";
import { ProductEntity } from "./product.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity('product_feedback')
export class ProductFeedBackEntity extends BaseModel {
      @PrimaryGeneratedColumn()
      id: bigint

      @ManyToOne(() => ProductEntity, (p) => p.id)
      product: ProductEntity

      @ManyToOne(() => FeedbackEntity, (f) => f.id)
      feedback: FeedbackEntity
}
