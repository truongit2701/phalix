import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SizeEntity} from 'src/entities/size.entity';
import {Repository} from 'typeorm';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepo: Repository<SizeEntity>,
  ) {}

  async getSizeList() {
    return await this.sizeRepo.find();
  }

  async create(body: any) {
    const newSize = await this.sizeRepo
      .create({
        name: body.name,
        description: body.description,
      })
      .save();

    return newSize;
  }
}
