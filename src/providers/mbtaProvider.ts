import { makeMbtaSubwayGraphProvider } from './mbtaProvider.make';
import { mbtaDataClient } from '../data-clients/mbtaDataClient';

export interface Stop {
    id: string;
    name: string;
    lat: number;
    lon: number;
    lineIds: string[];
}

export interface Line {
    id: string;
    name: string;
    color: string;
}

export interface RouteGraph {
    allStops: Map<string, Stop>;
    lineStops: Map<string, Stop[]>;
    lines: Map<string, Line>;
}

export type ProviderStatus = 'INITIAL' | 'LOADING' | 'READY' | 'ERROR';

export interface MbtaSubwayGraphProvider {
    init: () => Promise<void>;
    getStatus: () => ProviderStatus;
    getGraph: () => RouteGraph;
}

export const mbtaSubwayGraphProvider = makeMbtaSubwayGraphProvider({
    mbtaDataClient
});