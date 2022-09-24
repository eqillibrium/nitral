export class TgUserEntity {
	constructor(private readonly _telegramId: number) {}

	get telegramId(): number {
		return this._telegramId
	}
}
