import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null; 
  phone: string | null;
  latitude: number
  longitude:number
}

interface CreateGymUseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseResponse> {
    const gym = await this.gymsRepository.create({
    title,
    description,
    phone,
    latitude,
    longitude,
    })
    return {
      gym,
    };
  }
}
