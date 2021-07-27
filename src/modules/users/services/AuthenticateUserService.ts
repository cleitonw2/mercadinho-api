import { compare } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../middlewares/error/AppError";
import { AuthenticateUserDto } from "../dtos/AuthenticateUser.dto";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { User } from "../entities/User";


class AuthenticateUserService {
    async execute(
        authenticateUserDto: AuthenticateUserDto
    ): Promise<User> {

        const usersRepositories = getCustomRepository(UsersRepositories);

        const userExists = await usersRepositories.findOne({
            email: authenticateUserDto.email
        });

        if (!userExists) {
            throw new AppError("Invalid password or username!");
        }

        const passwordMatch = await compare(
            authenticateUserDto.password,
            userExists.password
        );

        if (!passwordMatch) {
            throw new AppError("Invalid password or username!");
        }

        const secret = process.env.JWT;

        const token = sign({
            email: userExists.email
        }, secret, {
            subject: userExists.id,
            expiresIn: "2d"
        });

        userExists.password = undefined;

        const userResponse = { ...userExists, token };

        return userResponse;
    }
}

export { AuthenticateUserService };