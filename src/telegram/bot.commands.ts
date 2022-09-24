import { CommandMapElement } from './bot.commands.interface'
import { IBotContext } from './bot.context.interface'
import { getKeyboardFromCommandsMap } from './helpers/keyboard'

export const commandsMap: CommandMapElement[] = [
	{
		command: '/start',
		action: (ctx: IBotContext) =>
			getKeyboardFromCommandsMap(ctx, commandsMap, 'Hello! Please, choose actions:'),
	},
	{
		command: '/test',
		action: (ctx: IBotContext) => ctx.reply('Test command'),
	},
	{
		command: '/address',
		action: (ctx: IBotContext) => ctx.scene.enter('address'),
	},
	{
		command: '/info',
		action: (ctx: IBotContext) => ctx.scene.enter('info'),
	},
	{
		command: '/profile',
		action: (ctx: IBotContext) => ctx.scene.enter('profile'),
	},
]
