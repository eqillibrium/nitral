import { PrismaClient } from '@prisma/client'

class Client {
  private static _instance: PrismaClient
  private constructor() {
  }
  public static get Instance () {
    return this._instance || (this._instance = new PrismaClient())
  }
}

const client: PrismaClient = Client.Instance

export default client