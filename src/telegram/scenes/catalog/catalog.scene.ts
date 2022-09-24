import { IBotContext } from '../../bot.context.interface'
import { getKeyboard } from '../../helpers/keyboard'
import { inject, injectable } from 'inversify'
import { Markup, Scenes } from 'telegraf'
import { ICatalogScene } from './catalog.scene.interface'
import { TYPES } from '../../../types'
import { IProductService } from '../../../products/product.service.interface'
import { SCENES_MAP } from '../scenes.map'
import { Product } from '@prisma/client'
import { inlineKeyboard } from 'telegraf/typings/markup'
import { BOT_TYPES } from '../../bot.types'
import { TgCartService } from '../../cart/tg.cart.service'
import { ITgCartService } from '../../cart/tg.cart.service.interface'
import { TgCartEntity } from '../../cart/tg.cart.entity'
import { ITgUserService } from '../../users/tg.user.service.inteface'

const keyboard = Markup.inlineKeyboard([Markup.button.callback('Delete', 'delete')])

@injectable()
export class CatalogScene implements ICatalogScene {
	protected catalog: Product[] | null
	protected _scene: Scenes.BaseScene<IBotContext>
	constructor(
		@inject(TYPES.ProductService) private readonly productService: IProductService,
		@inject(BOT_TYPES.TgCartService) private readonly tgCartService: ITgCartService,
		@inject(BOT_TYPES.TgUserService) private readonly tgUserService: ITgUserService,
	) {
		this._scene = new Scenes.BaseScene<IBotContext>(SCENES_MAP.catalog)
		this.catalog = null
	}

	get scene(): Scenes.BaseScene<IBotContext> {
		return this._scene
	}

	onEnter(): void {
		this.scene.enter(async (ctx: IBotContext) => {
			this.catalog = await this.productService.findAllProducts()
			if (!this.catalog) {
				return ctx.reply('Catalog is not found')
			}
			if (this.catalog.length === 0) {
				return ctx.reply('Catalog is empty')
			}
			await ctx.deleteMessage()
			await ctx.reply(
				this.catalog.map((product) => product.name).join('\n\n'),
				Markup.inlineKeyboard(
					this.catalog.map((product) => Markup.button.callback(product.name, product.name)),
				),
			)
			this.catalog.forEach((product) => {
				this.scene.action(product.name, (ctx) => this.onOpenProduct(ctx))
			})
			// @ts-ignore
			ctx.session.__scenes.state.id = ctx.message.from.id
		})
	}

	onBack(): void {
		this.scene.action('back', async (ctx: IBotContext) => {
			if (!this.catalog) {
				return ctx.reply('Catalog is not found')
			}
			if (this.catalog.length === 0) {
				return ctx.reply('Catalog is empty')
			}
			await ctx.deleteMessage()
			await ctx.reply(
				this.catalog.map((product) => product.name).join('\n\n'),
				Markup.inlineKeyboard(
					this.catalog.map((product) => Markup.button.callback(product.name, product.name)),
				),
			)
		})
	}

	onLeave(): void {
		// this.scene.leave((ctx) => ctx.reply('Leave info scene'))
	}

	async bindCommands(): Promise<void> {
		this.onBack()
	}

	async onOpenProduct(ctx: IBotContext): Promise<void | null> {
		const productName = ctx.callbackQuery?.data
		if (!productName) {
			return null
		}
		const product = await this.productService.findProductByName(productName)
		if (!product) {
			return null
		}
		await ctx.deleteMessage()
		await ctx.replyWithPhoto(product.image, {
			caption: product.name + '\n\n' + product.description + '\n\n' + product.price,
			...Markup.inlineKeyboard([
				Markup.button.callback('Back to catalog', 'back'),
				Markup.button.callback('add to cart', `add+${product.name}`),
			]),
		})
		this.scene.action(/add+[0-9]*/, (ctx: IBotContext) => this.onAdd(ctx))
	}

	async onAdd(ctx: IBotContext) {
		// @ts-ignore
		const name = await ctx.callbackQuery.data.split('+').pop()
		if (!name) {
			throw Error('No any ID')
		}
		const product = await this.productService.findProductByName(name)
		if (!product) {
			throw Error('Cant find product')
		}
		// @ts-ignore
		const userId = ctx.session.__scenes.state.id
		const user = await this.tgUserService.getTgUserInfo(userId)
		// @ts-ignore
		const newCartRecord = new TgCartEntity(user.id, product.id, product.price, 1)
		await this.tgCartService.addToCart(newCartRecord)
	}

	async init(): Promise<this> {
		this.onEnter()
		await this.bindCommands()
		this.onLeave()
		return this
	}
}
