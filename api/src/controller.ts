import { FastifyReply, FastifyRequest } from "fastify"
import sql from "./shared/postgres"
import parser from "nginx-log-traffic-parser"

export const getTraffic = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const result = await sql`select *from accounting_id_traffic`
  reply.send(result)
}

export const insertTraffic = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const date = await parser('../nginx/logs/http-accounting.log')
  
  date.forEach(async(item) => {
    const id = await sql`select id from accounting_id_traffic
                         where accounting_id = ${item.accounting_id}
                         and from_time = ${ new Date(item.from * 1000) }
                         and to_time = ${ new Date(item.to * 1000) }`

    if (!id.length) {
      await sql`insert into accounting_id_traffic 
               (accounting_id, requests, bytes_in, bytes_out, from_time, to_time)
               values (${ item.accounting_id }, ${ item.requests }, ${ item.bytes_in },
                       ${ item.bytes_out }, ${ new Date(item.from * 1000) }, ${ new Date(item.to * 1000) })`
    }
  })
}
