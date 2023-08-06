import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('material')
export class MaterialEntity extends BaseModel {
      @PrimaryGeneratedColumn()
      id: bigint
      
      @Column()
      name:string
      
      @Column()
      description: string
}
