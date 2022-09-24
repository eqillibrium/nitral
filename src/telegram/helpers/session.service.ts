// import { IBotContext } from '../bot.context.interface'
//
// export const set = (context: IBotContext, key: string, value: string | number) => {
// 	try {
// 		const session  = context.session
// 		if(!session) {
// 			return false
// 		}
// 		session.id = value
// 		return true
// 	} catch (e) {
// 		if(e instanceof Error) {
// 			throw Error(e.message)
// 		}
// 	}
// }