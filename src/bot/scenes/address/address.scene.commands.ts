import { CommandMapElement } from '../../bot.commands.interface'
import { Scenes } from 'telegraf'

const addressSceneCommands: CommandMapElement[] = [
	{
		command: '/back',
		action: Scenes.Stage.leave(),
	},
]
export default addressSceneCommands
