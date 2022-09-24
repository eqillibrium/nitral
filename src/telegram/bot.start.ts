import { inject, injectable } from 'inversify'
import { BOT_TYPES } from './bot.types'
import { IBotContext } from './bot.context.interface'
import { getKeyboard } from './helpers/keyboard'
import { SCENES_MAP } from './scenes/scenes.map'
import { BotEntity } from './bot.entity'
import { ITgUserService } from './users/tg.user.service.inteface'

@injectable()
export class BotStart {
	constructor(
		@inject(BOT_TYPES.BotEntity) private readonly botEntity: BotEntity,
		@inject(BOT_TYPES.TgUserService) private readonly tgUserService: ITgUserService,
	) {}

	onStart(): void {
		this.botEntity.bot.command('/start', async (ctx: IBotContext) => {
			if (!ctx.message) {
				throw Error('No any message')
			}
			if (!ctx.message.from.id) {
				throw Error('No any id')
			}
			const ifExists = await this.tgUserService.getTgUserInfo(ctx.message.from.id)
			if (!ifExists) {
				await this.tgUserService.createTgUser(ctx.message.from.id)
			}
			await getKeyboard(ctx, ['/catalog', '/cart'], 'Hello! Please, choose actions:')
		})
	}

	onCatalog(): void {
		this.botEntity.bot.command('/catalog', (ctx: IBotContext) =>
			ctx.scene.enter(SCENES_MAP.catalog),
		)
	}

	onCart(): void {
		this.botEntity.bot.command('/cart', (ctx: IBotContext) =>
			ctx.scene.enter(SCENES_MAP.cart),
		)
	}

	initCommands() {
		this.onStart()
		this.onCatalog()
		this.onCart()
	}
}
