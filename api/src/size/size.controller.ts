import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {SizeService} from './size.service';
import {BaseResponse} from 'src/response-exception/base-reponse';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get('list')
  async getSizeList(@Res() res: any) {
    const data = await this.sizeService.getSizeList();
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post('create')
  async createCategory(@Res() res: any, @Body() body: any) {
    const data = await this.sizeService.create(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }
}
