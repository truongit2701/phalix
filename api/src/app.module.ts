import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {ProductModule} from './product/product.module';
import {MaterialModule} from './material/material.module';
import {SizeModule} from './size/size.module';
import {CategoryModule} from './category/category.module';
import {FeedbackModule} from './feedback/feedback.module';
import {UserEntity} from './entities/user.entity';
import {SizeEntity} from './entities/size.entity';
import {MaterialEntity} from './entities/material.entity';
import {ProductMaterialEntity} from './entities/p-material.entity';
import {ProductFeedBackEntity} from './entities/p-feedback.entity';
import {FeedbackEntity} from './entities/feedback.entity';
import {ProductEntity} from './entities/product.entity';
import {CategoryEntity} from './entities/category.entity';
import {ProductSizeEntity} from './entities/p-size.entity';
import {AuthModule} from './auth/auth.module';
import {CartModule} from './cart/cart.module';
import {CartEntity} from './entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        UserEntity,
        SizeEntity,
        MaterialEntity,
        ProductMaterialEntity,
        ProductFeedBackEntity,
        FeedbackEntity,
        ProductEntity,
        CategoryEntity,
        ProductSizeEntity,
        CartEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    MaterialModule,
    SizeModule,
    CategoryModule,
    FeedbackModule,
    AuthModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
