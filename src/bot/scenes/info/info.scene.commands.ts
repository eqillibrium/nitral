import { CommandMapElement } from '../../bot.commands.interface'
import { Scenes } from 'telegraf'
import { IBotContext } from '../../bot.context.interface'

const infoSceneCommands: CommandMapElement[] = [
	{
		command: '/back',
		action: Scenes.Stage.leave()
	},
	{
		command: '/contacts',
		action: (ctx:IBotContext) => ctx.reply('Now i will show you our contacts')
	}
]
export default infoSceneCommands