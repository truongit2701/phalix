import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {CartService} from './cart.service';
import {BaseResponse} from 'src/response-exception/base-reponse';
import {AuthGuard} from 'src/auth/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Res() res: any, @Body() body: any, @Req() req: any) {
    const data = await this.cartService.create(body, req);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async getCartList(@Res() res: any, @Req() req: any) {
    const data = await this.cartService.getCartList(req.user.sub);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Get('admin-list')
  async getAdminCartList(@Res() res: any, @Req() req: any) {
    const data = await this.cartService.getAdminCartList();
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @UseGuards(AuthGuard)
  @Post('change-status')
  async changeStatus(@Res() res: any, @Body() body: any) {
    const data = await this.cartService.changeStatus(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @UseGuards(AuthGuard)
  @Post('change-status-private')
  async changeStatusPrivate(@Res() res: any, @Body() body: any) {
    const data = await this.cartService.changeStatusPrivate(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post('accept')
  async accept(@Res() res: any, @Body() body: any) {
    const data = await this.cartService.accept(body.id);
    console.log(data);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }
}
