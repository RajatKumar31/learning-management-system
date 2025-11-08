import express, { Request, Response, NextFunction } from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import morgan from 'morgan';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import env from './config/env';
import './config/db';
import HttpError from './middlewares/httpError';
import { sendOtpQueue } from './config/bullmq';
import './jobs';
import courseRouter from './routes/course';
import cors from 'cors';

const serverAdapter = new ExpressAdapter();
createBullBoard({
	queues: [new BullMQAdapter(sendOtpQueue)],
	serverAdapter: serverAdapter,
});
serverAdapter.setBasePath('/admin/bull');

export const app = express();

app.use('/admin/bull', serverAdapter.getRouter());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	morgan(
		':remote-addr :remote-user :method :url HTTP/:http-version :status - :response-time ms',
	),
);
app.use(cors());

app.use('/api/courses', courseRouter);

// no route found
app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(StatusCodes.NOT_FOUND).json({
		success: false,
		message: 'Invalid route, please check the URL',
	});
});

// error handler
app.use(
	(error: Error, req: Request, res: Response, next: NextFunction): any => {
		console.log(error);
		if (error instanceof HttpError) {
			// TODO : add logger info in queue
			return res
				.status(error.statusCode)
				.json({ success: false, message: error.message });
		}
		if (error instanceof ZodError) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				reason: `${error.errors[0].path} : ${error.errors[0].message}`,
				error: error.errors[0],
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Internal server error',
		});
	},
);

app.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT}`);
});
