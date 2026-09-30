import { Model } from 'mongoose';
import { Request, Response, Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

type SortOrder = Record<string, 1 | -1>;

function createCollectionRouter(model: Model<any>, sort?: SortOrder): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    const records = await model.find().sort(sort ?? {}).lean().exec();
    response.status(200).json(records);
  });

  router.get('/:id', async (request: Request, response: Response) => {
    const record = await model.findById(request.params.id).lean().exec();
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }
    response.status(200).json(record);
  });

  router.post('/', async (request: Request, response: Response) => {
    const record = await model.create(request.body);
    response.status(201).json(record);
  });

  return router;
}

const apiRouter = Router();
apiRouter.use('/users', createCollectionRouter(User));
apiRouter.use('/teams', createCollectionRouter(Team));
apiRouter.use('/activities', createCollectionRouter(Activity));
apiRouter.use('/leaderboard', createCollectionRouter(LeaderboardEntry, { points: -1 }));
apiRouter.use('/workouts', createCollectionRouter(Workout));

export default apiRouter;
