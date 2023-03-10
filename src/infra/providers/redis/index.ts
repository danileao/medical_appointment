import { createClient } from 'redis'

export type RedisTypeClient = ReturnType<typeof createClient>

export class CreateConnectionRedis {
  protected client: RedisTypeClient

  constructor() {
    this.client = this.createClient()
  }

  public async setValue(key: string, value: string) {
    return this.client.set(key, value)
  }

  public async getValue(key: string) {
    return this.client.get(key)
  }

  private createClient() {
    try {
      const client = createClient()
      client.connect()

      return client
    } catch (err) {
      throw new Error('Redis client error ' + err)
    }
  }
}
