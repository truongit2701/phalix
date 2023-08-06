import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('user')
export class UserEntity extends BaseModel {
      @PrimaryGeneratedColumn()
      id: bigint

      @Column()
      username: string

      @Column()
      password: string

      @Column()
      is_admin: number // 0: user, 1: admin

}
