import { Request, Response, NextFunction } from 'express';
import { searchProvider } from '../providers/searchProvider';
import { mbtaSubwayGraphProvider as graphProvider } from '../providers/mbtaProvider';

// search subway stops
export const searchStops = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let nameSearch = req.query['name'] as string;
    nameSearch = typeof(nameSearch) === 'string' ? nameSearch : '';

    await searchProvider.init();
    const results = searchProvider.findStopAndConnections(nameSearch);
    res.json(results);
  } catch (error) {
    console.log('------------------', error);
    next(error);
  }
};

// get single subway line
export const getLineById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await graphProvider.init();
    
    const item = graphProvider.getGraph().lines.get(id);
    if (!item) {
      res.status(404).json({ message: 'Subway Line not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};