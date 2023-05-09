import express, {Router as expressRouter} from "express";

export abstract class Router
{
    protected readonly router_: expressRouter;

    protected constructor(private endpoint: string)
    {
        this.router_ = express.Router();
    }

    getExpressRouter(): expressRouter
    {
        return this.router_;
    }

    getEndpoint(): string
    {
        return this.endpoint;
    }
}