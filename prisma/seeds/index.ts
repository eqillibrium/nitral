import { userSeeding } from './seed.user'

userSeeding().then(() => console.log('Seeding user table is successfully!'))