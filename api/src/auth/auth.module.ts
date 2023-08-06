import {Module} from '@nestjs/common';
import AuthController from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from 'src/user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from 'src/entities/user.entity';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from 'src/contants/auth.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
