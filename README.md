# mbta-svc
started from tutorial at: https://blog.logrocket.com/express-typescript-node/

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
  - `nmp run test --coverage`

## API Usage
- GET /api/stops/search?name=searchtext
  - searches all subway lines for stops with name that contains searchtext (case insensitive)
  - returns json array of stop objects with basic stop info

  - GET /api/line/[id]
    -  returns basic info on subway line by id 
    - (i.e) /api/line/Red
    - returns 404 if not found

## Testing Strategy
- see [Quality Strategy](./QUALITY_STRATEGY.md) doc

## Next Steps
- explore Typescript-bound open-api auto-gen to tie into swagger docs gen.
  - i.e. https://github.com/epiphone/routing-controllers-openapi
- fill out unit test code coverage
- improve error handling
- tie unit test footprint with contract testing implementation (Pact.io)
