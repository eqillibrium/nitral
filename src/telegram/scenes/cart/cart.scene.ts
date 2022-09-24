import { IBotContext } from '../../bot.context.interface'
import { getKeyboard } from '../../helpers/keyboard'
import { inject, injectable } from 'inversify'
import { Markup, Scenes } from 'telegraf'
import { TYPES } from '../../../types'
import { IProductService } from '../../../products/product.service.interface'
import { SCENES_MAP } from '../scenes.map'
import { TelegramCart } from '@prisma/client'
import { inlineKeyboard } from 'telegraf/typings/markup'
import { BOT_TYPES } from '../../bot.types'
import { TgCartService } from '../../cart/tg.cart.service'
import { ITgCartService } from '../../cart/tg.cart.service.interface'
import { TgCartEntity } from '../../cart/tg.cart.entity'
import { ITgUserService } from '../../users/tg.user.service.inteface'
import { ICartScene } from './cart.scene.interface'

@injectable()
export class CartScene implements ICartScene {
	protected cart: TelegramCart[] | null
	protected _scene: Scenes.BaseScene<IBotContext>
	constructor(
		@inject(TYPES.ProductService) private readonly productService: IProductService,
		@inject(BOT_TYPES.TgCartService) private readonly tgCartService: ITgCartService,
		@inject(BOT_TYPES.TgUserService) private readonly tgUserService: ITgUserService,
	) {
		this._scene = new Scenes.BaseScene<IBotContext>(SCENES_MAP.cart)
		this.cart = null
	}

	get scene(): Scenes.BaseScene<IBotContext> {
		return this._scene
	}

	onEnter(): void {
		this.scene.enter(async (ctx: IBotContext) => {
			// @ts-ignore
			ctx.session.__scenes.state.id = ctx.message.from.id
			// @ts-ignore
			const user = await this.tgUserService.getTgUserInfo(ctx.message.from.id)
			// @ts-ignore
			this.cart = await this.tgCartService.getUserCart(user.id)
			console.log(this.cart)
			if (!this.cart) {
				return ctx.reply('Cart is empty')
			}
			if (this.cart.length === 0) {
				return ctx.reply('Cart is empty')
			}
			await ctx.deleteMessage()
			await ctx.reply(
				this.cart.map((product) => product.product_id).join('\n\n'),
				Markup.inlineKeyboard(
					this.cart.map((product) => Markup.button.callback('Remove', `/remove+${product.product_id}`)),
				),
			)
			this.scene.action(/remove+[0-9]*/, (ctx: IBotContext) => this.onRemove(ctx))
		})
	}

	onBack(): void {
		this.scene.action('back', async (ctx: IBotContext) => {

		})
	}

	onLeave(): void {
		// this.scene.leave((ctx) => ctx.reply('Leave info scene'))
	}

	async bindCommands(): Promise<void> {
		this.onBack()
	}

	async onOpenProduct(ctx: IBotContext): Promise<void | null> {

	}

	async onRemove(ctx: IBotContext) {
		// @ts-ignore
		const product_id = await ctx.callbackQuery.data.split('+').pop()
		if (!product_id) {
			throw Error('No any ID')
		}
		const product = await this.productService.findProductByID(Number(product_id))
		if (!product) {
			throw Error('Cant find product')
		}
		// @ts-ignore
		const user_id = ctx.session.__scenes.state.id
		const user = await this.tgUserService.getTgUserInfo(user_id)
		// @ts-ignore
		await this.tgCartService.removeFromCart(user.id, Number(product_id))
	}

	async init(): Promise<this> {
		this.onEnter()
		await this.bindCommands()
		this.onLeave()
		return this
	}
}
