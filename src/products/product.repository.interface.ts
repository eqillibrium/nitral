import { Product } from '@prisma/client'
import { ProductEntity } from './product.entity'

export interface IProductRepository {
	create: (product: ProductEntity) => Promise<Product>
	findOne: (key: string, value: string | number) => Promise<Product | null>
	findAll: () => Promise<Product[] | null>
}
