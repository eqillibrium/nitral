import { CommandMapElement } from './bot.commands.interface'
import { Telegraf } from 'telegraf'
import { IBotContext } from './bot.context.interface'

export interface IBotService {
	init: () => Promise<void>
}
