import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CartEntity} from 'src/entities/order.entity';
import {ProductEntity} from 'src/entities/product.entity';
import {Not, Repository} from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async create(body: any, req: any) {
    const p = await this.productRepo.findOneBy({
      id: body.product_id,
    });

    const newCart = this.cartRepo.create({
      user: {id: req.user.sub},
      product: p,
      status: 0, // chua gửi hàng
    });

    await this.cartRepo.save(newCart);
    return;
  }

  async getCartList(userId: any) {
    return await this.cartRepo.find({
      where: {
        user: {id: userId},
      },
      relations: ['product'],
    });
  }

  async getAdminCartList() {
    return await this.cartRepo.find({
      where: {
        status: Not(0),
      },
      relations: ['product', 'user'],
    });
  }

  async changeStatus(body) {
    await this.cartRepo
      .createQueryBuilder()
      .update(CartEntity)
      .set({status: 1})
      .whereInIds(body.idCarts)
      .execute();
    return;
  }

  async changeStatusPrivate(body: any) {
    const cart = await this.cartRepo
      .create({
        id: body.id,
        status: 1,
      })
      .save();

    return await this.cartRepo.findOne({
      where: {
        id: cart.id,
      },
      relations: ['product'],
    });
  }

  async accept(id: any) {
    const cart = await this.cartRepo.update(
      {
        id,
      },
      {
        status: 2,
      },
    );

    return await this.cartRepo.findOne({
      where: {
        id,
      },
      relations: ['product'],
    });
  }
}
