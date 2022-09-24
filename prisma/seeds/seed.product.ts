import { Product } from '@prisma/client'
import client from './prisma.client'

const product1: Pick<Product, 'name' | 'price'| 'description' | 'image'> = {
	name: 'product1',
	description: 'very interesting description about the product1',
	image: 'https://picsum.photos/200/300',
	price: 200
}

const product2: Pick<Product, 'name' | 'price'| 'description' | 'image'> = {
	name: 'product2',
	description: 'very interesting description about the product2',
	image: 'https://picsum.photos/200/300',
	price: 150
}

const product3: Pick<Product, 'name' | 'price'| 'description' | 'image'> = {
	name: 'product3',
	description: 'very interesting description about the product3',
	image: 'https://picsum.photos/200/300',
	price: 375
}

const products = [product1, product2, product3]

export const productSeeding = async () => {
	await client.$connect()
	await client.product.createMany({ data: products })
	await client.$disconnect()
}