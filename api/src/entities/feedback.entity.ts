import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('feedback')
export class FeedbackEntity extends BaseModel{
      @PrimaryGeneratedColumn()
      id: bigint

      @Column()
      content: string

      @Column()
      user_full_name: string 
}