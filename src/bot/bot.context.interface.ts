import { Context, Scenes } from 'telegraf'
import { IBotSession } from './bot.session.interface'
import { IBotSessionScene } from './scenes/bot.scenes.interface'

export interface IBotContext extends Context {
	session: IBotSession
	scene: Scenes.SceneContextScene<IBotContext, IBotSessionScene>
}