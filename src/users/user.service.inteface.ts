import { User } from '@prisma/client'

export interface IUserService {
	createUser: (email: string) => Promise<User | null>
	getUserInfo: (email: string) => Promise<User | null>
}
