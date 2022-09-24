import { IBotContext } from './bot.context.interface'

export interface CommandMapElement {
	command: string
	action: (ctx: IBotContext, service?: unknown) => void
}
