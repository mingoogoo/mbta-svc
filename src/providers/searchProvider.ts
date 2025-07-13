import { Stop } from './mbtaProvider';
import { makeSearchProvider } from './searchProvider.make';
import { mbtaSubwayGraphProvider } from './mbtaProvider';

export interface SearchProvider {
    init: () => Promise<void>,
    findStopAndConnections: (nameMatch: string) => Stop[];
}

export const searchProvider = makeSearchProvider({
    graphProvider: mbtaSubwayGraphProvider
});