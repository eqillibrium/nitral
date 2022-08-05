import { CommandMapElement } from './bot.commands.interface'

export interface IBotService {
	commands: CommandMapElement[]
	initCommands: () => void
	init: () => Promise<void>
}
