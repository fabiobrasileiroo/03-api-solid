import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const UseCase = new GetUserProfileUseCase(usersRepository)

  return UseCase
}