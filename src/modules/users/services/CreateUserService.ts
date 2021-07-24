import { hash } from "bcrypt";
import { classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../../middlewares/error/AppError";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { UsersRepositories } from "../repositories/UsersRepositories";

class CreateUserService {
    async execute(
        createUserDto: CreateUserDto
    ): Promise<object> {

        const usersRepositories = getCustomRepository(UsersRepositories);
   
        const userAlreadyExists = await usersRepositories
            .findOne({ email: createUserDto.email });

        if (userAlreadyExists) {
            throw new AppError("User already exists!", 409);
        }

        if(createUserDto.password.length < 5) {
            throw new AppError("Password requires five or more characters!");
        }

        const passowrdHash = await hash(createUserDto.password, 10);

        createUserDto.password = passowrdHash;

        const user = usersRepositories.create(createUserDto);

        const errors = await validate(user);

        if (!(errors.length === 0)) {
            throw new AppError(errors);
        }

        await usersRepositories.save(user);

        return classToPlain(user);
    }
}

export { CreateUserService };