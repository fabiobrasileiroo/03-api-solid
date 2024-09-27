import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const serchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = serchGymQuerySchema.parse(request.body)
  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
