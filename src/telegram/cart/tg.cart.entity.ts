export class TgCartEntity {
	constructor(
		private readonly _user_id: number,
		private readonly _product_id: number,
		private readonly _price: number,
		private readonly _count: number,
	) {}

	get user_id(): number {
		return this._user_id
	}

	get product_id(): number {
		return this._product_id
	}

	get price(): number {
		return this._price
	}

	get count(): number {
		return this._count
	}
}
