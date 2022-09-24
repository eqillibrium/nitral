export class UserEntity {
	constructor(private readonly _email: string) {}

	get email(): string {
		return this._email
	}
}
