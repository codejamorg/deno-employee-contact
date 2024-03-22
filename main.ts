// app.ts
import express, { Request, Response, NextFunction } from 'npm:express@4.18.2';
import { load } from 'https://deno.land/std@0.220.0/dotenv/mod.ts';
import routes from './routes.ts';

const env = await load();

const PORT = env['PORT'] || 8000;
const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
