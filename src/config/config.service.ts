import { inject, injectable } from 'inversify'
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv'
import { IConfigService } from './config.service.interface'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'

@injectable()
export class ConfigService implements IConfigService {
	protected readonly config!: DotenvParseOutput
	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		const result: DotenvConfigOutput = config()
		if (result.error) {
			this.logger.error(`Не удалось прочитать файл .env или он отсутствует`)
		} else {
			this.config = result.parsed as DotenvParseOutput
		}
	}
	get<T extends number | string>(key: string): T {
		return this.config[key] as T
	}
}
