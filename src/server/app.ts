import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";
import createConnection from  "../database"
import dotenv from "dotenv"
import { AppError } from "../middlewares/error/AppError";

dotenv.config();

createConnection();

const app = express();

app.use(express.json());

app.use(routes);

app.use(
    (err: Error,
        request: Request,
        response: Response,
        next: NextFunction) => {

        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            });
        }
        
        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`
        });
    });

export { app }