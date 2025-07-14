# mbta-svc
Started from tutorial at: https://blog.logrocket.com/express-typescript-node/

Core logic to create mock data and walkable graph of stops adapted from a previous project of mine:
 - https://gitlab.com/mingu-public/mbta

## Notes
- Neighboring stops not yet listed on results of api/stops/search call
- TODO: swapping out mbtaDataClient away from mock data-client and into wrapper for calls to subset of public mbta api.
- only a small subset of unit tests examples so far.

## Running Locally
- clone repo
- from local repo root:
  - `npm install`
  - `npm run dev`
- from a 2nd terminal window: 
  - `curl -X GET http://localhost:3000/api/stops/search?name=Downtown`

## Running Unit Tests
- from local repo root:
  - `npm run test`
     
     this will run all unit tests and generate test coverage report.

## API Usage
- GET /api/stops/search?name=searchtext
  - searches all subway lines for stops with name that contains searchtext (case insensitive)
  - returns json array of stop objects with basic stop info.
    - i.e. 
        ```
        [{
            id: 'place-dwnxg',
            name: 'Downtown Crossing',
            lineIds: ['Red', 'Orange'],
            lat: 42.355518,
            lon: -71.060225,
        }]
        ```
  - GET /api/line/[id]
    -  returns basic info on subway line by id 
    - (i.e) /api/line/Red
       ```
       {
           "id":"Red",
           "name":"Red Line",
           "color":"DA291C"
       }
       ```
    - returns 404 if not found

## Design Considerations
- YAGNI: kept to minimum exposed api and return schemas to satisfy requirements and reduce exposure to breaking contract changes.
- minimal api path structure to allow for future api expansion with reasonable organization.
- api versioning expected to be supported if needed, likely through path token.
  - i.e. /api-v2/blah-blah
- prioritized demonstrating Seperation-of-Concerns design pattern, and SOLID to show unit-testable code patterns.
  - api stack:
    - router
    - controllers
    - providers
    - data-clients

## Testing Strategy
- see [Quality Strategy](./QUALITY_STRATEGY.md) doc

## Next Steps
- only use mock mbta data-client for unit tests, and implement real mbta data-client.
- expand api to include more lookup abilities, like api/stop/[id]
- explore Typescript-bound open-api auto-gen to tie into swagger docs gen.
  - i.e. https://github.com/epiphone/routing-controllers-openapi
- fill out unit test code coverage
- improve error handling
- tie unit test footprint with contract testing implementation (Pact.io)
