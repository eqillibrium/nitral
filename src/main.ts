import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { LoggerService } from './logger/logger.service'
import { PrismaService } from './database/prisma.service'
import 'reflect-metadata'
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { BotService } from "./bot/bot.service";
import { IBotService } from "./bot/bot.service.interface";

export interface IBootstrap {
    appContainer: Container
    app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope()
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
    bind<IBotService>(TYPES.BotService).to(BotService).inSingletonScope()
    bind<App>(TYPES.Application).to(App)
})

async function bootstrap(): Promise<IBootstrap> {
    const appContainer = new Container()
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application)
    await app.init()
    return { appContainer, app }
}

export const boot = bootstrap()