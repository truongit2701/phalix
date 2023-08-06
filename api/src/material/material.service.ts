import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {MaterialEntity} from 'src/entities/material.entity';
import {Repository} from 'typeorm';
import {CreateMaterialDto} from './dto/create-material.dto';
import {ExceptionResponse} from 'src/response-exception';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private materialRepository: Repository<MaterialEntity>,
  ) {}

  async getMaterialList() {
    const materialList = await this.materialRepository.find();
    return materialList;
  }

  async createMaterial(body: CreateMaterialDto) {
    const {name, description} = body;

    return await this.materialRepository
      .create({
        name,
        description,
      })
      .save();
  }

  async getDetailMaterial(id: any) {
    const material = await this.materialRepository.findOneBy({
      id,
    });

    if (!material)
      throw new ExceptionResponse(
        HttpStatus.BAD_REQUEST,
        'Không tìm thấy nguyên liệu!',
      );
    return material;
  }

  async updateMaterial(id: any, body: any) {
    const material = await this.materialRepository.findOneBy({
      id,
    });
    if (!material)
      throw new ExceptionResponse(
        HttpStatus.BAD_REQUEST,
        'Không tìm thấy nguyên liệu!',
      );

    const newData = await this.materialRepository
      .create({
        id,
        name: body.materialUpdateName,
        description: body.materialUpdateDescription,
      })
      .save();

    return newData;
  }

  async removeMaterial(id: any) {
    await this.materialRepository.delete(id);
    return;
  }
}
