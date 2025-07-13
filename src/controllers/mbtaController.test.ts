import { Request, Response } from 'express';
import { searchStops, getLineById } from './mbtaController';
import { Stop, Line } from '../providers/mbtaProvider';

type MbtaDataClientExports = typeof import('../data-clients/mbtaDataClient');
jest.mock('../data-clients/mbtaDataClient', (): MbtaDataClientExports => {
    type MakeExports = typeof import('../data-clients/mockMbtaDataClient');
    const make = jest.requireActual<MakeExports>('../data-clients/mockMbtaDataClient');
    return {
        mbtaDataClient: make.makeMockMbtaDataClient({ routesDelay: 100, stopsDelay: 100 })
    }
});

describe('Mbta Controller', () => {
  it('should return search results for Alewife', async () => {
    // Arrange
    const req = {
        query: {
            name: 'Alewife'
        } as Request['query']
    } as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const nextWatch = jest.fn();

    // Act
    await searchStops(req, res, nextWatch);

    // Assert
    expect(nextWatch).toHaveBeenCalledTimes(0);  // no error

    const expectedResults: Stop[] = [
        {
            id: "place-alfcl",
            name: "Alewife",
            lineIds: ['Red'],
            lat: 42.395428,
            lon: -71.142483,
       }
    ]

    // Expect that res.json was called with an empty array
    expect(res.json).toHaveBeenCalledWith(expectedResults);
  });
});