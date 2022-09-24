import { TgCartEntity } from './tg.cart.entity'
import { TelegramCart } from '@prisma/client'

export interface ITgCartService {
	addToCart: ({ user_id, product_id, price, count }: TgCartEntity) => Promise<TelegramCart | null>
	removeFromCart: (user_id: number, product_id: number) => Promise<TelegramCart | null>
	getUserCart: (user_id: number) => Promise<TelegramCart[] | TelegramCart | null>
}
