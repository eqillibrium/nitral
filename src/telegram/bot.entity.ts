import { inject, injectable } from 'inversify'
import { Telegraf } from 'telegraf'
import { IBotContext } from './bot.context.interface'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class BotEntity {
	private readonly token!: string
	private readonly _bot: Telegraf<IBotContext>
	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.token = this.configService.get('TG_TOKEN')
		this._bot = new Telegraf(this.token)
	}
	get bot(): Telegraf<IBotContext> {
		return this._bot
	}
}
