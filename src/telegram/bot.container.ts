import { ContainerModule, interfaces } from 'inversify'
import { IBotService } from './bot.service.interface'
import { BotService } from './bot.service'
import { BOT_TYPES } from './bot.types'
import { ISessionService } from './session/session.service.interface'
import { SessionService } from './session/session.service'
import { BotStart } from './bot.start'
import { BotEntity } from './bot.entity'
import { StageService } from './stage.service'
import { ICatalogScene } from './scenes/catalog/catalog.scene.interface'
import { CatalogScene } from './scenes/catalog/catalog.scene'
import { ITgUserRepository } from './users/tg.user.repository.interface'
import { TgUserRepository } from './users/tg.user.repository'
import { ITgUserService } from './users/tg.user.service.inteface'
import { TgUserService } from './users/tg.user.service'
import { ITgCartRepository } from './cart/tg.cart.repository.interface'
import { TgCartRepository } from './cart/tg.cart.repository'
import { ITgCartService } from './cart/tg.cart.service.interface'
import { TgCartService } from './cart/tg.cart.service'
import { ICartScene } from './scenes/cart/cart.scene.interface'
import { CartScene } from './scenes/cart/cart.scene'

export const botBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ICatalogScene>(BOT_TYPES.CatalogScene).to(CatalogScene).inSingletonScope()
	bind<ICartScene>(BOT_TYPES.CartScene).to(CartScene).inSingletonScope()
	bind<ISessionService>(BOT_TYPES.SessionService).to(SessionService).inSingletonScope()
	bind<StageService>(BOT_TYPES.StageService).to(StageService).inSingletonScope()
	bind<BotStart>(BOT_TYPES.BotStart).to(BotStart).inSingletonScope()
	bind<BotEntity>(BOT_TYPES.BotEntity).to(BotEntity).inSingletonScope()
	bind<IBotService>(BOT_TYPES.BotService).to(BotService).inSingletonScope()
	bind<ITgUserRepository>(BOT_TYPES.TgUserRepository).to(TgUserRepository).inSingletonScope()
	bind<ITgUserService>(BOT_TYPES.TgUserService).to(TgUserService).inSingletonScope()
	bind<ITgCartRepository>(BOT_TYPES.TgCartRepository).to(TgCartRepository).inSingletonScope()
	bind<ITgCartService>(BOT_TYPES.TgCartService).to(TgCartService).inSingletonScope()
})
