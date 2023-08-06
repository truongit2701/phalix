import {Module} from '@nestjs/common';
import {SizeService} from './size.service';
import {SizeController} from './size.controller';
import {SizeEntity} from 'src/entities/size.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity])],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
