import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Router from './routers/index';

import { AppError, NotFound } from './utils/appResponse';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';

const app: Application = express();
// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  // 檢查是否為 JSON 解析的 SyntaxError
  if (err instanceof SyntaxError && err.statusCode === 400 && 'body' in err) {
    console.error('JSON 解析錯誤:', err);
    return res.status(400).json({
      status: 'error',
      message: '傳入的 JSON 格式錯誤，請檢查逗號或引號是否正確',
    });
  }
  // 如果不是 JSON 解析錯誤，則交由下一個中介軟體處理
  next();
});

// Root Route
app.use('/v1/api', Router);
app.get('/OPTION', (req: Request, res: Response) => {
  res.status(200).json();
});

//Route 404
app.use(NotFound);

// middleware全域錯誤處理
app.use(errorHandler);

export default app;
