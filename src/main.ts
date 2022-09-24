import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { LoggerService } from './logger/logger.service'
import { PrismaService } from './database/prisma.service'
import 'reflect-metadata'
import { IConfigService } from './config/config.service.interface'
import { ConfigService } from './config/config.service'
import { IUserService } from './users/user.service.inteface'
import { UserService } from './users/user.service'
import { IUserRepository } from './users/user.repository.interface'
import { UsersRepository } from './users/users.repository'
import { botBindings } from './telegram/bot.container'
import { IProductService } from './products/product.service.interface'
import { ProductService } from './products/product.service'
import { ProductRepository } from './products/product.repository'
import { IProductRepository } from './products/product.repository.interface'

export interface IBootstrap {
	appContainer: Container
	app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope()
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope()
	bind<IProductService>(TYPES.ProductService).to(ProductService).inSingletonScope()
	bind<IUserRepository>(TYPES.UserRepository).to(UsersRepository).inSingletonScope()
	bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository).inSingletonScope()
	bind<App>(TYPES.Application).to(App)
})

async function bootstrap(): Promise<IBootstrap> {
	const appContainer = new Container()
	appContainer.load(appBindings)
	appContainer.load(botBindings)
	const app = appContainer.get<App>(TYPES.Application)
	await app.init()
	return { appContainer, app }
}

export const boot = bootstrap()
