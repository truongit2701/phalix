import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('size')
export class SizeEntity extends BaseModel {
      @PrimaryGeneratedColumn()
      id: bigint
      
      @Column()
      name:string
      
      @Column()
      description: string
}
