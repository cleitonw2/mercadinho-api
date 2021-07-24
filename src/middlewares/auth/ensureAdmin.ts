import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../modules/users/repositories/UsersRepositories";



export
    async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const user_id = req.user_id;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const { isAdmin } = await usersRepositories.findOne(user_id);

    if (isAdmin) {
        return next();
    }

    return res.status(401).json("Unauthorized!");
}