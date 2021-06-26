import { json } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {hash} from "bcryptjs"
import { JsonWebTokenError } from "jsonwebtoken";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserServices {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("email incorrect");
    }

    const userAlreadyExist = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExist) {
      throw new Error("user Already exist");
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserServices };
