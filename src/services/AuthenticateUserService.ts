import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    //gerar token
    const token = sign(
      {
        email: user.email,
      },
      "b2e1c4b6064c2b7d3e97f125af89c80e",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token
  }
}

export { AuthenticateUserService };
