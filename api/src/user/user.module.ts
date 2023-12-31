import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UserService],
})
export class UserModule {}
