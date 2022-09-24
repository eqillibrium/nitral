import { IUserRepository } from './user.repository.interface'
import { UserEntity } from './user.entity'
import { User } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { PrismaService } from '../database/prisma.service'
import { TYPES } from '../types'

@injectable()
export class UsersRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async create({ email }: UserEntity): Promise<User> {
		return this.prismaService.client.user.create({
			data: {
				email,
				password: '12345',
			},
		})
	}

	async find(email: string): Promise<User | null> {
		return this.prismaService.client.user.findFirst({
			where: {
				email,
			},
		})
	}
}
