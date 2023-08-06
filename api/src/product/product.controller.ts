import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {ProductService} from './product.service';
import {BaseResponse} from 'src/response-exception/base-reponse';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async getProductList(@Res() res: any) {
    const data = await this.productService.getProductList();
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Get(':id/detail')
  async getProductDetail(@Res() res: any, @Param() param: any) {
    const data = await this.productService.getProductDetail(param.id);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post('create')
  async create(@Res() res: any, @Body() body: any) {
    const data = await this.productService.create(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }
}
