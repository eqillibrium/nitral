import { IBotContext } from '../bot.context.interface'

export interface ISessionService {
	writeSessionStateValue: (context: IBotContext, key: string, value: any) => boolean
	clearSessionStateValue: (context: IBotContext, key: string) => boolean
}
