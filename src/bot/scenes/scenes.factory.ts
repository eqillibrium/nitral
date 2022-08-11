import { Scenes } from 'telegraf'
import { IBotContext } from '../bot.context.interface'
import { CommandMapElement } from '../bot.commands.interface'

abstract class SceneFactory {
	protected _id: string
	protected _scene: Scenes.BaseScene<IBotContext>
	protected commands?: CommandMapElement[]
	protected constructor(id: string, commands: CommandMapElement[] = []) {
		this._id = id
		this._scene = new Scenes.BaseScene<IBotContext>(id)
		this.commands = commands
	}
	get id(): string {
		return this._id
	}
	get scene(): Scenes.BaseScene<IBotContext> {
		return this._scene
	}
	protected bindCommands(): void {
		this.commands &&
			this.commands.forEach((commandElement) => {
				this.scene.command(commandElement.command, commandElement.action)
			})
	}
	protected abstract onEnter(): void
	protected abstract onLeave(): void
	protected abstract init(): this
}

export default SceneFactory
