import { MbtaDataClientContract, SubwayRoutesResult, SubwayStopsResult } from "./mbtaDataClient";

import mockRoutes from "./mock-data/mock-routes.json";
import redStops from "./mock-data/stops-red.json";
import orangeStops from "./mock-data/stops-orange.json";
import mattapanStops from "./mock-data/stops-mattapan.json";
import blueStops from "./mock-data/stops-blue.json";
import greenBStops from "./mock-data/stops-green-b.json";
import greenCStops from "./mock-data/stops-green-c.json";
import greenDStops from "./mock-data/stops-green-d.json";
import greenEStops from "./mock-data/stops-green-e.json";

const stopsData = new Map<string, SubwayStopsResult>()
    .set("Red", redStops)
    .set("Orange", orangeStops)
    .set("Mattapan", mattapanStops)
    .set("Blue", blueStops)
    .set("Green-B", greenBStops)
    .set("Green-C", greenCStops)
    .set("Green-D", greenDStops)
    .set("Green-E", greenEStops)

export interface MockMbtaDataClientArgs {
    routesDelay: number;
    stopsDelay: number;
}

const defaultMockArgs: MockMbtaDataClientArgs = {
    routesDelay: 500,
    stopsDelay: 250
}

export const makeMockMbtaDataClient = (mockArgs?: MockMbtaDataClientArgs): MbtaDataClientContract => {
    const args: Required<MockMbtaDataClientArgs> = {
        ...defaultMockArgs,
        ...mockArgs
    }
    const dataClient: MbtaDataClientContract = {
        getSubwayRoutes: (): Promise<SubwayRoutesResult> => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: mockRoutes.data
                    })
                }, args.routesDelay);
            })
        },

        getSubwayStops: (routeId: string): Promise<SubwayStopsResult> => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let stops = stopsData.get(routeId);
                    if (stops === undefined) {
                        stops = {
                            data: []
                        }
                    }
                    resolve({
                        data: stops.data
                    })
                }, args.stopsDelay);
            })
        }
    }
    return dataClient;
}