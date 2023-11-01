import fastify, { FastifyInstance } from 'fastify'
import { getTraffic, insertTraffic } from './src/controller'

const server: FastifyInstance = fastify()

server.route({
  method: 'GET',
  url: '/',
  handler: getTraffic
})

server.route({
  method: 'POST',
  url: '/',
  handler: insertTraffic
})

const main = async (): Promise<void> => {
  server.listen({ port: 5000 }, (error: Error | null, address: string) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

main()