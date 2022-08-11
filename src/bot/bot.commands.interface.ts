import { IBotContext } from './bot.context.interface'

export interface CommandMapElement {
	command: string
	action: (ctx: IBotContext) => void
}
