import { inject, injectable } from 'inversify'
import { BOT_TYPES } from '../bot.types'
import { ITgCartRepository } from './tg.cart.repository.interface'
import { TgCartEntity } from './tg.cart.entity'
import { TelegramCart } from '@prisma/client'
import { ITgCartService } from './tg.cart.service.interface'

@injectable()
export class TgCartService implements ITgCartService {
	constructor(
		@inject(BOT_TYPES.TgCartRepository) private readonly tgCartRepository: ITgCartRepository,
	) {}

	async addToCart({
		user_id,
		product_id,
		price,
		count,
	}: TgCartEntity): Promise<TelegramCart | null> {
		const newCartRecord = new TgCartEntity(user_id, product_id, price, count)
		const alreadyAdded = await this.tgCartRepository.ifExists(
			newCartRecord.user_id,
			newCartRecord.product_id,
		)
		if (alreadyAdded) {
			return this.tgCartRepository.increaseCount(newCartRecord.user_id, newCartRecord.product_id)
		}
		return this.tgCartRepository.add(newCartRecord)
	}

	async removeFromCart(user_id: number, product_id: number): Promise<TelegramCart | null> {
		const alreadyAdded = await this.tgCartRepository.ifExists(user_id, product_id)
		if (!alreadyAdded) {
			return null
		}
		if (alreadyAdded.count !== 1) {
			return this.tgCartRepository.decreaseCount(user_id, product_id)
		}
		return this.tgCartRepository.remove(user_id, product_id)
	}

	async getUserCart(user_id: number): Promise<TelegramCart | TelegramCart[] | null> {
		return this.tgCartRepository.findByUserID(user_id)
	}
}
