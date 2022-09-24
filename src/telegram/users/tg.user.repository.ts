import { inject, injectable } from 'inversify'
import { TelegramUser } from '@prisma/client'
import { ITgUserRepository } from './tg.user.repository.interface'
import { TgUserEntity } from './tg.user.entity'
import { PrismaService } from '../../database/prisma.service'
import { TYPES } from '../../types'

@injectable()
export class TgUserRepository implements ITgUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async create({ telegramId }: TgUserEntity): Promise<TelegramUser> {
		return this.prismaService.client.telegramUser.create({
			data: {
				telegram_id: telegramId,
			},
		})
	}

	async find(id: number): Promise<TelegramUser | null> {
		return this.prismaService.client.telegramUser.findFirst({
			where: {
				telegram_id: id,
			},
		})
	}
}
