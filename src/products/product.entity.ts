export class ProductEntity {
	constructor(
		private readonly _name: string,
		private readonly _description: string,
		private readonly _image: string,
		private readonly _price: number,
	) {}

	get name(): string {
		return this._name
	}

	get price(): number {
		return this._price
	}

	get image(): string {
		return this._image
	}

	get description(): string {
		return this._description
	}
}
