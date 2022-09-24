import { userSeeding } from './seed.user'
import { productSeeding } from './seed.product'

userSeeding().then(() => console.log('Seeding user table is successfully!'))
productSeeding().then(() => console.log('Seeding product table is successfully!'))