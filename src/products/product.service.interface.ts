import { Product } from '@prisma/client'
import { ProductCreateDto } from './product.create.dto'

export interface IProductService {
	createProduct: ({ name, description, image, price }: ProductCreateDto) => Promise<Product | null>
	findProductByName: (name: string) => Promise<Product | null>
	findProductByID: (id: number) => Promise<Product | null>
	findAllProducts: () => Promise<Product[] | null>
}
