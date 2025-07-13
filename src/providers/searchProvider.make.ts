import { Stop, MbtaSubwayGraphProvider } from './mbtaProvider';
import { SearchProvider } from './searchProvider';


export interface SearchProviderDependencies {
    graphProvider: MbtaSubwayGraphProvider
}

export const makeSearchProvider = (deps: SearchProviderDependencies): SearchProvider => {
    const provider: SearchProvider = {
        init: async (): Promise<void> => {
            await deps.graphProvider.init();
        },
        findStopAndConnections: (nameMatch: string): Stop[] => {
            const graph = deps.graphProvider.getGraph();

            const stops: Stop[] = [];
            const myMatch = nameMatch.toLowerCase();
            
            graph.allStops.forEach((value) => {
                const candidate = value.name.toLowerCase();
                if (candidate.includes(myMatch)) {
                    stops.push(value);
                }
            })
            return stops;
        }
    }
    return provider;
}