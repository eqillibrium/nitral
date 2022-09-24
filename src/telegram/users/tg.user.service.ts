import { inject, injectable } from 'inversify'
import { ITgUserService } from './tg.user.service.inteface'
import { TgUserEntity } from './tg.user.entity'
import { ITgUserRepository } from './tg.user.repository.interface'
import { TelegramUser } from '@prisma/client'
import { BOT_TYPES } from '../bot.types'

@injectable()
export class TgUserService implements ITgUserService {
	constructor(@inject(BOT_TYPES.TgUserRepository) private tgUserRepository: ITgUserRepository) {}
	async createTgUser(id: number): Promise<TelegramUser | null> {
		const newUser = new TgUserEntity(id)
		const isExists = await this.tgUserRepository.find(id)
		if (isExists) {
			return null
		}
		return this.tgUserRepository.create(newUser)
	}

	async getTgUserInfo(id: number): Promise<TelegramUser | null> {
		return this.tgUserRepository.find(id)
	}
}
