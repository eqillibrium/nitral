import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'
import { ILogger } from '../logger/logger.interface'
import { IBotService } from './bot.service.interface'
import LocalSession from 'telegraf-session-local'
import { BOT_TYPES } from './bot.types'
import { BotStart } from './bot.start'
import { BotEntity } from './bot.entity'
import { StageService } from './stage.service'

@injectable()
export class BotService implements IBotService {
	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(BOT_TYPES.BotEntity) private readonly botEntity: BotEntity,
		@inject(BOT_TYPES.StageService) private readonly stageService: StageService,
		@inject(BOT_TYPES.BotStart) private readonly botStart: BotStart,
	) {}

	private async initMiddlewares(): Promise<void> {
		this.botEntity.bot.use(new LocalSession({ database: 'session.json' }).middleware())
		this.botEntity.bot.use((await this.stageService.initStage()).stage.middleware())
	}

	public async init(): Promise<void> {
		try {
			await this.initMiddlewares()
			this.botStart.initCommands()
			await this.botEntity.bot.launch()
			this.logger.log('[Bot Service] The telegram is successfully connected!')
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[Bot Service] Bot connection error!' + e.message)
				throw Error
			}
		}
	}
}
