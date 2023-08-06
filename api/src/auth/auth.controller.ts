import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {BaseResponse} from 'src/response-exception/base-reponse';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: any): any {
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).send(new BaseResponse({data: req.user}));
  }
}
