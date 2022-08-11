import { Scenes } from 'telegraf'
import { IBotSessionScene } from './scenes/bot.scenes.interface'

export type IBotSession = Scenes.SceneSession<IBotSessionScene>
