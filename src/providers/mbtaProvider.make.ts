import { MbtaDataClientContract } from '../data-clients/mbtaDataClient';
import { MbtaSubwayGraphProvider, RouteGraph, ProviderStatus, Stop, Line } from './mbtaProvider';

export interface MbtaSubwayGraphProviderDeps {
    mbtaDataClient: MbtaDataClientContract;
}

export const makeMbtaSubwayGraphProvider = (deps: MbtaSubwayGraphProviderDeps): MbtaSubwayGraphProvider => {
    const graph: RouteGraph = {
        allStops: new Map<string, Stop>(),
        lines: new Map<string, Line>(),
        lineStops: new Map<string, Stop[]>() 
    }
    let status: ProviderStatus = 'INITIAL';

    const provider: MbtaSubwayGraphProvider = {
        getStatus: () => status,
        init: async (): Promise<void> => {
            if (status !== 'READY') {
                try {
                    const mbta = deps.mbtaDataClient;
                    const lines = await mbta.getSubwayRoutes();
                    let linesFinal: Map<string, Line> = new Map<string, Line>();
                    let routesFinal: Map<string, Stop[]> = new Map<string, Stop[]>();
                    let stopsFinal: Map<string, Stop> = new Map<string, Stop>();

                    // for-of ensures sequential async flow for deterministic results
                    for (const line of lines.data) {
                        linesFinal.set(line.id, {
                            id: line.id,
                            name: line.attributes.long_name,
                            color: line.attributes.color
                        })
                        routesFinal.set(line.id, []);

                        type GetSubwayStopsYield = Awaited<ReturnType<typeof mbta.getSubwayStops>>;
                        const stops: GetSubwayStopsYield = await mbta.getSubwayStops(line.id);

                        stops.data.forEach((stop) => {
                            if (stopsFinal.has(stop.id)) {
                                // stop already entered, so must be showing up on new line
                                stopsFinal.get(stop.id)?.lineIds.push(line.id);
                            } else {
                                // add stop
                                const stopFinal: Stop = {
                                    id: stop.id,
                                    name: stop.attributes.name,
                                    lineIds: [line.id],
                                    lat: stop.attributes.latitude,
                                    lon: stop.attributes.longitude
                                }
                                stopsFinal.set(stop.id, stopFinal);
                            }
                            // add to route
                            routesFinal.get(line.id)?.push(stopsFinal.get(stop.id) as Stop);
                        })
                    };
                    graph.allStops = stopsFinal;
                    graph.lines = linesFinal;
                    graph.lineStops = routesFinal;
                    status = 'READY';
                }
                catch (e) {
                    // TODO: log error, etc.
                    status = 'ERROR';
                }
            }
        },
        getGraph: () => {
            if (status !== 'READY') {
                throw new Error('GraphNotInitialized');
            }
            return graph;
        } 
    }

    return provider;
}