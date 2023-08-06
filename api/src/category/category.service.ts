import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CategoryEntity} from 'src/entities/category.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  async getCategoryList() {
    const categoryList = await this.categoryRepository.find();
    return categoryList;
  }

  async createCategory(body) {
    const {name, description} = body;
    const newCategory = await this.categoryRepository
      .create({
        name,
        description,
      })
      .save();
    return newCategory;
  }
}
