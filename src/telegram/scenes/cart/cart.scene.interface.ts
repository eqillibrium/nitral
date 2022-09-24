import { Scenes } from 'telegraf'
import { IBotContext } from '../../bot.context.interface'

export interface ICartScene {
	get scene(): Scenes.BaseScene<IBotContext>
	onEnter: () => void
	onLeave: () => void
	bindCommands: () => void
	init: () => Promise<this>
}
