import { TelegramUser } from '@prisma/client'

export interface ITgUserService {
	createTgUser: (id: number) => Promise<TelegramUser | null>
	getTgUserInfo: (id: number) => Promise<TelegramUser | null>
}
