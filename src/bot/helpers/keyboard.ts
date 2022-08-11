import { IBotContext } from '../bot.context.interface'
import { CommandMapElement } from '../bot.commands.interface'
import { Markup } from 'telegraf'

export const getKeyboardFromCommandsMap = async (
	ctx: IBotContext,
	commands: CommandMapElement[],
	title = 'Choose actions',
): Promise<void> => {
	const commandsList: string[] = []
	commands
		.filter((el) => el.command !== '/start')
		.forEach((el) =>
			commandsList.push(Object.values(el).find((element) => typeof element === 'string')),
		)
	await ctx.reply(
		title,
		Markup.keyboard([...commandsList], {
			wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
		}).oneTime(),
	)
}
