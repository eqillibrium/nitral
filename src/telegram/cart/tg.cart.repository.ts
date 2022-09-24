import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { PrismaService } from '../../database/prisma.service'
import { TgCartEntity } from './tg.cart.entity'
import { ITgCartRepository } from './tg.cart.repository.interface'
import { TelegramCart } from '@prisma/client'
import { contains } from 'class-validator'

@injectable()
export class TgCartRepository implements ITgCartRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async add({ user_id, product_id, price, count }: TgCartEntity): Promise<TelegramCart> {
		return this.prismaService.client.telegramCart.create({
			data: {
				user_id,
				product_id,
				price,
				count,
			},
		})
	}

	async remove(user_id: number, product_id: number): Promise<TelegramCart | null> {
		return this.prismaService.client.telegramCart.delete({
			where: { user_id_product_id: { user_id, product_id } },
		})
	}

	async increaseCount(user_id: number, product_id: number): Promise<TelegramCart | null> {
		return this.prismaService.client.telegramCart.update({
			where: { user_id_product_id: { user_id, product_id } },
			data: { count: { increment: 1 } },
		})
	}

	async decreaseCount(user_id: number, product_id: number): Promise<TelegramCart | null> {
		return this.prismaService.client.telegramCart.update({
			where: { user_id_product_id: { user_id, product_id } },
			data: { count: { increment: -1 } },
		})
	}

	async ifExists(user_id: number, product_id: number): Promise<TelegramCart | null> {
		return this.prismaService.client.telegramCart.findFirst({ where: { user_id, product_id } })
	}

	async findByUserID(user_id: number) {
		this.prismaService.client.telegramCart.findMany({ where: { user_id: user_id }, select: { product: {  } }})
		return this.prismaService.client.telegramCart.findMany({where: { user_id: user_id }})
	}
}
