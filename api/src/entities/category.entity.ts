import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('category')
export class CategoryEntity extends BaseModel {
      @PrimaryGeneratedColumn()
      id: bigint
      
      @Column()
      name:string
      
      @Column()
      description: string
}
