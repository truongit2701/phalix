import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {CategoryService} from './category.service';
import {BaseResponse} from 'src/response-exception/base-reponse';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('list')
  async getCategoryList(@Res() res: any) {
    const data = await this.categoryService.getCategoryList();
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post('create')
  async createCategory(@Res() res: any, @Body() body: any) {
    const data = await this.categoryService.createCategory(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }
}
