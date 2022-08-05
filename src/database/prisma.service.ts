import { inject, injectable } from 'inversify'
import { PrismaClient } from '@prisma/client'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'
import 'reflect-metadata'

@injectable()
export class PrismaService {
	client: PrismaClient

	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		this.client = new PrismaClient()
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect()
			this.logger.log('[Prisma Service] the database is successfully connected!')
		} catch (e) {
			if (e instanceof Error) {
				throw Error(e.message)
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect()
	}
}
