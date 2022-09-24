import { IBotContext } from '../bot.context.interface'
import { ISessionService } from './session.service.interface'
import { injectable } from 'inversify'

@injectable()
export class SessionService implements ISessionService {
	public writeSessionStateValue(context: IBotContext, key: string, value: any): boolean {
		try {
			const sessionState = context.session.__scenes.state
			if (!sessionState) {
				return false
			}
			// @ts-ignore
			sessionState[key] = value
			return true
		} catch (e) {
			if (e instanceof Error) {
				throw Error
			}
			return false
		}
	}

	public clearSessionStateValue(context: IBotContext, key: string): boolean {
		try {
			const sessionState = context.session.__scenes.state
			if (!sessionState) {
				return false
			}
			// @ts-ignore
			delete sessionState[key]
			return true
		} catch (e) {
			if (e instanceof Error) {
				throw Error
			}
			return false
		}
	}
}
