import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IProductRepository } from './product.repository.interface'
import { IProductService } from './product.service.interface'
import { ProductEntity } from './product.entity'
import { Product } from '@prisma/client'
import { ProductCreateDto } from './product.create.dto'

@injectable()
export class ProductService implements IProductService {
	constructor(
		@inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
	) {}

	async createProduct({
		name,
		description,
		price,
		image,
	}: ProductCreateDto): Promise<Product | null> {
		const newProduct = new ProductEntity(name, description, image, price)
		const isExists = await this.productRepository.findOne('name', name)
		if (isExists) {
			return null
		}
		return this.productRepository.create(newProduct)
	}

	async findAllProducts(): Promise<Product[] | null> {
		return this.productRepository.findAll()
	}

	async findProductByName(name: string): Promise<Product | null> {
		return this.productRepository.findOne('name', name)
	}

	findProductByID(id: number): Promise<Product| null> {
		return this.productRepository.findOne('id', id)
	}
}
