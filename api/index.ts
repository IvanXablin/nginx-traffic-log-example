import fastify, { FastifyInstance } from 'fastify'
import { getTraffic, insertTraffic } from './src/controller'
import cron from 'node-cron'

const server: FastifyInstance = fastify()

server.route({
  method: 'GET',
  url: '/',
  handler: getTraffic
})

const main = async (): Promise<void> => {
  cron.schedule('* * * * *', () => {
    insertTraffic()
  });

  server.listen({ host: 'api', port: 5000 }, (error: Error | null, address: string) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

main()