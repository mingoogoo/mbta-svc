import { makeMockMbtaDataClient } from "../data-clients/mockMbtaDataClient";
import { makeMbtaSubwayGraphProvider } from "./mbtaProvider.make";
import { makeSearchProvider } from "./searchProvider.make";
import { Stop } from "./mbtaProvider";

describe('Mbta Search Provider', () => {
    let graphProvider = makeMbtaSubwayGraphProvider({
        mbtaDataClient: makeMockMbtaDataClient({
            routesDelay: 100,
            stopsDelay: 100
        })
    })
    beforeAll(async () => {
        await graphProvider.init();
    });
    it("finds Downtown Crossing", async () => {
        // Arrange
        const searchProvider = makeSearchProvider({ graphProvider });

        // Act
        const results = searchProvider.findStopAndConnections('Downtown Crossing');

        // Assert
        const expectedResults: Stop[] = [{
            id: 'place-dwnxg',
            name: 'Downtown Crossing',
            lineIds: ['Red', 'Orange'],
            lat: 42.355518,
            lon: -71.060225,
        }]
        expect(results).toEqual(expectedResults);
    });
});