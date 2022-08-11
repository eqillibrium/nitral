import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'
import { Telegraf } from 'telegraf'
import { ILogger } from '../logger/logger.interface'
import { IBotService } from './bot.service.interface'
import { commandsMap } from './bot.commands'
import { CommandMapElement } from './bot.commands.interface'
import LocalSession from 'telegraf-session-local'
import { IBotContext } from './bot.context.interface'
import { stage } from './bot.stage'
import { getKeyboardFromCommandsMap } from './helpers/keyboard'

@injectable()
export class BotService implements IBotService {
	private readonly token!: string
	protected bot: Telegraf<IBotContext>
	readonly commands: CommandMapElement[]
	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.token = this.configService.get('TG_TOKEN')
		this.bot = new Telegraf(this.token)
		this.commands = commandsMap
	}

	initCommands(): void {
		this.commands.forEach((commandElement: CommandMapElement) => {
			this.bot.command(commandElement.command, commandElement.action)
		})
		this.bot.on('text', (ctx: IBotContext) =>
			getKeyboardFromCommandsMap(ctx, commandsMap, 'Please, choose valid actions from the list'),
		)
	}

	private initMiddlewares(): void {
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware())
		this.bot.use(stage.middleware())
	}

	public async init(): Promise<void> {
		try {
			this.initMiddlewares()
			this.initCommands()
			await this.bot.launch()
			this.logger.log('[Bot Service] The bot is successfully connected!')
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[Bot Service] Bot connection error!' + e.message)
			}
		}
	}
}
