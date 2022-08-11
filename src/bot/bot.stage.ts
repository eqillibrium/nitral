import { Scenes } from 'telegraf'
import { IBotContext } from './bot.context.interface'
import addressSceneInstance from './scenes/address/address.scene'
import infoSceneInstance from './scenes/info/info.scene'

export const stage = new Scenes.Stage<IBotContext>([addressSceneInstance, infoSceneInstance])
