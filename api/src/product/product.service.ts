import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProductMaterialEntity} from 'src/entities/p-material.entity';
import {ProductSizeEntity} from 'src/entities/p-size.entity';
import {ProductEntity} from 'src/entities/product.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductMaterialEntity)
    private productMaterialRepository: Repository<ProductMaterialEntity>,

    @InjectRepository(ProductSizeEntity)
    private productSizeRepo: Repository<ProductSizeEntity>,
  ) {}

  async getProductList() {
    // const productList = await this.productMaterialRepository
    //   .createQueryBuilder('product_material')
    //   .leftJoin('product_material.product', 'product')
    //   .leftJoin('product_material.material', 'material')
    //   .select([
    //     'product.name',
    //     'product.color',
    //     "STRING_AGG(material.name, ',')",
    //     'product_size',
    //   ])
    //   .getRawMany();
    const productList = await this.productRepository.find({
      relations: ['category'],
    });
    const result = await Promise.all(
      productList.map(async (p) => {
        return {
          ...p,
          materialNames: (
            await this.productMaterialRepository.find({
              where: {product: {id: p.id}},
              relations: {material: true},
            })
          ).map((item) => item.material.name),
          sizeNames: (
            await this.productSizeRepo.find({
              where: {product: {id: p.id}},
              relations: {size: true},
            })
          ).map((item) => item.size.name),
        };
      }),
    );
    return result;
  }

  async create(body: any) {
    const {name, price, color, materials, category, sizes} = body;
    console.log('category', category);
    const newProduct = await this.productRepository
      .create({
        name,
        default_price: price,
        color,
        category: {id: category},
      })
      .save();

    await this.productMaterialRepository
      .createQueryBuilder('product_material')
      .insert()
      .values(
        materials.map((id: any) => {
          return {
            product: {id: newProduct.id},
            material: {id},
          };
        }),
      )
      .execute();

    await this.productSizeRepo
      .createQueryBuilder('product_size')
      .insert()
      .values(
        sizes.map((id: any) => {
          return {
            product: {id: newProduct.id},
            size: {id: id},
          };
        }),
      )
      .execute();

    const productReturn = await this.productRepository.findOne({
      where: {id: newProduct.id},
      relations: ['category'],
    });

    console.log(productReturn);
    console.log({
      ...productReturn,
      materialNames: (
        await this.productMaterialRepository.find({
          where: {product: {id: newProduct.id}},
          relations: {material: true},
        })
      ).map((item) => item.material.name),
      sizeNames: (
        await this.productSizeRepo.find({
          where: {product: {id: newProduct.id}},
          relations: {size: true},
        })
      ).map((item) => item.size.name),
    });
    try {
      return {
        ...productReturn,
        materialNames: (
          await this.productMaterialRepository.find({
            where: {product: {id: newProduct.id}},
            relations: {material: true},
          })
        ).map((item) => item.material.name),
        sizeNames: (
          await this.productSizeRepo.find({
            where: {product: {id: newProduct.id}},
            relations: {size: true},
          })
        ).map((item) => item.size.name),
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getProductDetail(id) {
    const materials = (
      await this.productMaterialRepository.find({
        where: {
          product: {id},
        },
        relations: {material: true},
      })
    ).map((item) => item.material);

    const size = (
      await this.productSizeRepo.find({
        where: {
          product: {id},
        },
        relations: {size: true},
      })
    ).map((item) => item.size);

    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });

    return {...product, materials: materials, sizes: size};
  }
}
