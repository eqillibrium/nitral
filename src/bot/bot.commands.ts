import { Context } from 'telegraf'
import { CommandMapElement } from './bot.commands.interface'

export const commandsMap: CommandMapElement[] = [
	{
		command: '/start',
		action: (ctx: Context) => ctx.reply('Hello from Bot!'),
	},
	{
		command: '/test',
		action: (ctx: Context) => ctx.reply('Test command'),
	},
]
