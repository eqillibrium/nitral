import { IBotContext } from '../../bot.context.interface'
import { CommandMapElement } from '../../bot.commands.interface'
import SceneFactory from '../scenes.factory'
import infoSceneCommands from './info.scene.commands'
import { getKeyboardFromCommandsMap } from '../../helpers/keyboard'

class InfoScene extends SceneFactory {
	constructor(id: string, commands: CommandMapElement[]) {
		super(id, commands)
	}
	protected onEnter(): void {
		this.scene.enter((ctx) => getKeyboardFromCommandsMap(ctx, this.commands ?? [], 'You are now into the INFO scene. Choose actions:'))
	}
	protected onLeave(): void {
		this.scene.leave((ctx) => ctx.reply('Leave info scene'))
	}
	protected onText(): void {
		this.scene.on('text', (ctx: IBotContext) => getKeyboardFromCommandsMap(ctx, this.commands ?? [], 'You are now into the INFO scene. Choose actions:'))
	}
	init() {
		this.onEnter()
		this.bindCommands()
		this.onText()
		this.onLeave()
		return this
	}
}

const infoSceneInstance = new InfoScene('info', infoSceneCommands).init().scene

export default infoSceneInstance