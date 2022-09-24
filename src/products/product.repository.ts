import { inject, injectable } from 'inversify'
import { PrismaService } from '../database/prisma.service'
import { Product } from '@prisma/client'
import { ProductEntity } from './product.entity'
import { IProductRepository } from './product.repository.interface'
import { TYPES } from '../types'

@injectable()
export class ProductRepository implements IProductRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async create(product: ProductEntity): Promise<Product> {
		return this.prismaService.client.product.create({
			data: product,
		})
	}

	async findAll(): Promise<Product[] | null> {
		return this.prismaService.client.product.findMany()
	}

	async findOne(key: string, value: string | number): Promise<Product | null> {
		return this.prismaService.client.product.findFirst({ where: { [key]: value } })
	}
}
