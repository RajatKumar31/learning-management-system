import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';

type Controller = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

type validatedController<Output, Input> = (
    validatedBody: Output,
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

type ExpressAsyncHandler = {
    (controller: Controller): RequestHandler;
    <Output, Input>(
        controller: validatedController<Output, Input>,
        options: {
            validationSchema: ZodSchema<Output, any, Input>;
            getValue: (req: Request) => Promise<any> | any;
        },
    ): RequestHandler;
};

const expressAsyncHandler: ExpressAsyncHandler = (
    controller: any,
    options?: any,
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (options) {
                const { validationSchema, getValue } = options;
                const value = await getValue(req);
                const validatedData = await (
                    validationSchema as ZodSchema
                ).parse(value);
                return await controller(validatedData, req, res, next);
            } else {
                return await controller(req, res, next);
            }
        } catch (error: unknown) {
            return next(error);
        }
    };
};

export default expressAsyncHandler;
