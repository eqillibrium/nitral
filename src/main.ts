import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class Main {
    async init () {
        try {
            await prisma.$connect()
            console.log('Database connected')
        } catch {

        }
    }
}

const main = new Main()
main.init()