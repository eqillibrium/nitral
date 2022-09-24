import { inject, injectable } from 'inversify'
import { IUserService } from './user.service.inteface'
import { UserEntity } from './user.entity'
import { IConfigService } from '../config/config.service.interface'
import { IUserRepository } from './user.repository.interface'
import { User } from '@prisma/client'
import { TYPES } from '../types'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async createUser(email: string): Promise<User | null> {
		const newUser = new UserEntity(email)
		const isExists = await this.userRepository.find(email)
		if (isExists) {
			return null
		}
		return this.userRepository.create(newUser)
	}

	async getUserInfo(email: string): Promise<User | null> {
		return this.userRepository.find(email)
	}
}
