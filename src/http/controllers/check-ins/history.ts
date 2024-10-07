import { makeFetchUserCheckInsUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const createInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = createInHistoryQuerySchema.parse(request.query)

  const FetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsUseCase()

  const { checkIns } = await FetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns
  })
}
