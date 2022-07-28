import { User } from '@prisma/client'
import client from './prisma.client'

const user: Pick<User, 'email' | 'password'> = {
  email: 'admin@mail.ru',
  password: 'admin'
}

export const userSeeding = async () => {
  await client.$connect()
  await client.user.create({ data: user })
  await client.$disconnect()
}