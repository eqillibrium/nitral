import { Scenes } from 'telegraf'
import { IBotContext } from '../../bot.context.interface'

export interface ICatalogScene {
	get scene(): Scenes.BaseScene<IBotContext>
	onEnter: () => void
	onLeave: () => void
	bindCommands: () => void
	init: () => Promise<this>
}
