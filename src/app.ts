import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRouter } from './app/modules/student.routers';
const app = express();

//parser
app.use(express.json());
//middleware
app.use(cors());


app.use('/api/v1/students',StudentRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
