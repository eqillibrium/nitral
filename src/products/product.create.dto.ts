import { IsString, IsNumber } from 'class-validator'

export class ProductCreateDto {
	@IsString()
	name!: string

	@IsString()
	description!: string

	@IsString()
	image!: string

	@IsNumber()
	price!: number
}
