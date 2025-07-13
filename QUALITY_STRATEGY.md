# MBTA-Api Quality Strategy
# Objectives
- Enable and protect team velocity to efficiently deliver high quality code that is agile to extension and change.
- Shift Quality "to the left" by encouraging code to be highly unit-testable and follow SOLID design principles.
- Enable team to own it's quality.
- favor precise "instruments" that give precise and fast signal.  Tests, monitoring implements should answer precise questions, not pull double or tripple duty.

# Scope
- MBTA-Api service itself
- Not breaking any down-stream api usage dependencies
- monitoring of external dependencies

# Testing
- Testing Pyramid based strategy (automated)
- gating merge PR to main:
  - foundation of extensive unit tests at the base of the pyramid (no env/deployment burden).
    - unit test coverage of 80% or higher.
    - branch coverage of 80% or higher.
      - including error cases
    - above 100% coverage for key logic areas.
    - for list mechanics, test for:
      - one
      - none
      - a few
      - many
  - functional (larger unit tests) to test internal service paths thru code (still no env/deployment)
  - contract testing to ensure upstream api consumer expectations are still met.
  - connectivity sanity check (env deployment)
- on-demand/optional
  - run e2e test suite (ui) which includes very small set of happy-path tests tagged as calling this service.
- hourly tests
  - api tests against external mbta api
- load testing
  - setup dedicated load testing suite
  - run nightly and on-demand
  - non-gating

# Manual Testing
- exploratory testing only
  - focused on new/changed feature functionality
- bugs are triaged into targeted unit/contract test addtions/changes, etc. that show bug is fixed and serve as regression test assurance.

# Observability
- service health checks
- external mbta service health check
- dashboards
- forensic logging.

# Release Process
- automated release to environments:
  - testing, staging, etc.
  - prod
- artifact-based release for easier roll-back, foresnsics, etc.

# Stakeholders
- **Product**: feature acceptance criteria, prioritization
- **API Consumers**: coordinate breaking api changes
- **Operations**: align with robust monitoring practices
- **Team Developers**: ergonomics/tooling
- **Quality Enablement**: align with tooling/methodoligy for protecting code maintainabilty and efficient cross-system testing strategies.