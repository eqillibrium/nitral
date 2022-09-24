import { inject, injectable } from 'inversify'
import { BOT_TYPES } from './bot.types'
import { Scenes } from 'telegraf'
import { IBotContext } from './bot.context.interface'
import { ICatalogScene } from './scenes/catalog/catalog.scene.interface'
import { ICartScene } from './scenes/cart/cart.scene.interface'

@injectable()
export class StageService {
	private _stage!: Scenes.Stage<IBotContext>
	constructor(
		@inject(BOT_TYPES.CatalogScene) private catalogScene: ICatalogScene,
		@inject(BOT_TYPES.CartScene) private cartScene: ICartScene,
	) {}

	async initStage(): Promise<this> {
		const catalogSceneInstance = (await this.catalogScene.init()).scene
		const cartSceneInstance = (await this.cartScene.init()).scene
		this._stage = new Scenes.Stage<IBotContext>([catalogSceneInstance, cartSceneInstance])
		return this
	}

	get stage(): Scenes.Stage<IBotContext> {
		return this._stage
	}
}
