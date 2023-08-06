import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from 'src/entities/user.entity';
import {ExceptionResponse} from 'src/response-exception';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async login(body: any) {
    const {username, password} = body;

    const user = await this.userRepo.findOneBy({
      username,
    });

    if (!user)
      throw new ExceptionResponse(
        HttpStatus.NOT_FOUND,
        'Không tìm thấy tài khoản!',
      );

    if (password !== user.password)
      throw new ExceptionResponse(
        HttpStatus.BAD_REQUEST,
        'Mật khẩu không chính xác!',
      );

    // TODO: Generate a JWT and return it here
    // instead of the user object

    return user;
  }
}
