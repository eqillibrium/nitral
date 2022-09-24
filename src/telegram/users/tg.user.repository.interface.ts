import { TelegramUser } from '@prisma/client'
import { TgUserEntity } from './tg.user.entity'

export interface ITgUserRepository {
	create: (user: TgUserEntity) => Promise<TelegramUser>
	find: (id: number) => Promise<TelegramUser | null>
}
