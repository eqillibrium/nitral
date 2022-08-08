import { Scenes } from 'telegraf'
import { IBotSessionScene } from './scenes/bot.scenes.interface'

export interface IBotSession extends Scenes.SceneSession<IBotSessionScene> {}