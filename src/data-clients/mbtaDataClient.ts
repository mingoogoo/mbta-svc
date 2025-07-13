import { makeMockMbtaDataClient } from './mockMbtaDataClient';

export interface SubwayRoute {
    attributes: {
        long_name: string;
        color: string;
        direction_names: string[];
        direction_destinations: string[];
    };
    id: string;
}

export interface SubwayStop {
    attributes: {
        name: string;
        municipality: string;
        address: string | null;
        latitude: number;
        longitude: number;
    };
    id: string;
}

export interface SubwayRoutesResult {
    data: SubwayRoute[];
}

export interface SubwayStopsResult {
    data: SubwayStop[];
}

export interface MbtaDataClientContract {
    getSubwayRoutes: () => Promise<SubwayRoutesResult>;
    getSubwayStops: (routeId: string) => Promise<SubwayStopsResult>;
}

// TODO: code a data-client that exposes subset of real mbta api calls
export const mbtaDataClient = makeMockMbtaDataClient();