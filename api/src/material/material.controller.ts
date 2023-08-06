import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {MaterialService} from './material.service';
import {BaseResponse} from 'src/response-exception/base-reponse';
import {CreateMaterialDto} from './dto/create-material.dto';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get('list')
  async getProductList(@Res() res: any) {
    const data = await this.materialService.getMaterialList();
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post('create')
  async createMaterial(@Res() res: any, @Body() body: CreateMaterialDto) {
    const data = await this.materialService.createMaterial(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Get(':id/detail')
  async detailMaterial(@Res() res: any, @Param() param: any) {
    const data = await this.materialService.getDetailMaterial(param.id);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post(':id/update')
  async updateMaterial(
    @Res() res: any,
    @Param() param: any,
    @Body() body: any,
  ) {
    const data = await this.materialService.updateMaterial(param.id, body);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post(':id/remove')
  async removeMaterial(@Res() res: any, @Param() param: any) {
    await this.materialService.removeMaterial(param.id);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }
}
