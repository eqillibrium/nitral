import { Server } from 'http'
import express, { Express } from 'express'
import { inject, injectable } from 'inversify'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { PrismaService } from './database/prisma.service'
import { json } from 'body-parser'
import { ConfigService } from './config/config.service'
import { IBotService } from './telegram/bot.service.interface'
import { BOT_TYPES } from './telegram/bot.types'

@injectable()
class App {
	app: Express
	server!: Server
	port: number
	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ConfigService) private configService: ConfigService,
		@inject(BOT_TYPES.BotService) private botService: IBotService,
	) {
		this.app = express()
		this.port = this.configService.get('EXPRESS_PORT')
	}

	protected useMiddleware(): void {
		this.app.use(json())
	}

	public async init(): Promise<void> {
		this.useMiddleware()
		await this.prismaService.connect()
		this.server = this.app.listen(this.port)
		await this.botService.init()
		this.logger.log(`[App] Server started on ${this.port};`)
	}

	public close(): void {
		this.server.close()
	}
}

export { App }
