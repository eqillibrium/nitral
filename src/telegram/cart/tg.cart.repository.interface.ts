import { TgCartEntity } from './tg.cart.entity'
import { TelegramCart } from '@prisma/client'

export interface ITgCartRepository {
	add: ({ user_id, product_id, price, count }: TgCartEntity) => Promise<TelegramCart>
	ifExists: (user_id: number, product_id: number) => Promise<TelegramCart | null>
	increaseCount: (user_id: number, product_id: number) => Promise<TelegramCart | null>
	decreaseCount: (user_id: number, product_id: number) => Promise<TelegramCart | null>
	remove: (user_id: number, product_id: number) => Promise<TelegramCart | null>
	findByUserID: (user_id: number) => Promise<TelegramCart[] | TelegramCart | null>
}
