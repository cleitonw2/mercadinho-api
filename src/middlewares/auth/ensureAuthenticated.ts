import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).send();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT) as IPayload;

        req.user_id = sub;

        next();
    } catch (error) {
        return res.status(401).send(error.message);
    }
}