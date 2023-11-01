import { FastifyReply, FastifyRequest } from "fastify"
import sql from "./shared/postgres"
import parser from "../../parser/parser"

export const getTraffic = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const result = await sql`select *from accounting_id_traffic`
  const sas = await parser()
  reply.send(sas)
}

export const insertTraffic = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const result = await sql`insert into accounting_id_traffic 
                           (accounting_id, requests, bytes_in, bytes_out, from_time, to_time)
                           values (${ 1 }, ${ 2 }, ${ 3 }, ${ 4 }, ${ 5 }, ${ 6 })
                          `
  reply.send(result)
}