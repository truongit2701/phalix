import {HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from 'src/entities/user.entity';
import {ExceptionResponse} from 'src/response-exception';
import {Repository} from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async signIn(body: any) {
    const {username, password} = body;
    const user = await this.userRepo.findOne({where: {username: username}});

    if (!user)
      throw new ExceptionResponse(
        HttpStatus.NOT_FOUND,
        'Không tìm thấy tài khoản!',
      );

    if (user?.password !== password) {
      throw new ExceptionResponse(
        HttpStatus.NOT_FOUND,
        'Mật khẩu không chính xác!',
      );
    }
    const payload = {sub: user.id, username: user.username};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
