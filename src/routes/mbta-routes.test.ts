import request from 'supertest';
import app from '../app';
import { getLineById, searchStops } from '../controllers/mbtaController';
import { NextFunction, Request, Response } from 'express';

jest.mock('../controllers/mbtaController');

// test utils
const asMockedFn = <F extends (...args: any[]) => any>(fn: F) => {
    return fn as jest.MockedFunction<typeof fn>;
}

const mockControllerFnAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
    asMockedFn(fn).mockImplementation((_req, res, _next): Promise<void> => {
        res.json([]);
        return Promise.resolve();
    })

describe('mbta routes', () => {
  beforeEach(() => {
    mockControllerFnAsync(getLineById);
    mockControllerFnAsync(searchStops);
  })
  it('GET /stops/search route - calls expected controller', async () => {
    // Act
    const response = await request(app)
      .get('/api/stops/search')
      .set('Accept', 'application/json')

    // Assert
    expect(searchStops).toHaveBeenCalledTimes(1);
  });

  it('GET /line/[id] route - calls expected controller with id param', async () => {
    // Act
    const response = await request(app)
      .get('/api/line/Red')
      .set('Accept', 'application/json')

    // Assert
    expect(getLineById).toHaveBeenCalledTimes(1);
    
    // check expected url param in call 0's first param (request)
    expect(asMockedFn(getLineById).mock.calls[0][0].params.id).toBe('Red');
  });
});
