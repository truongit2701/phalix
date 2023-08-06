import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export class BaseModel extends BaseEntity {
  @UpdateDateColumn({
    type: 'timestamp',
  })
  timestamp: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
