# Project Structure and Release Process

## Project Structure

The Node/JS SDK is written in TypeScript. The public-facing API is
defined in `src/sdk.ts` and `src/ux.ts`. Note that the Node SDK
contains functionality unimplemented in other SDKs for legacy
reasons.

The public API is backed by communication with the SDK daemon as
defined in `src/request.ts`. This code is not intended to be exposed
to end users but functionality in the rest of the SDK should be
implemented in terms of it.

## Release Process

This SDK is published to NPM as `@cto.ai/sdk`. If logged in to an NPM
account that is part of the CTO.ai team, publishing a new version just
requires an `npm publish`. You must increment the version number
first, which if you are not able to push to the master branch on
GitHub, requires the following procedure.

1. Create a new branch
2. Push the branch to GitHub
3. Run `npm version major|minor|patch` as appropriate
4. Create a PR with the automatically pushed commit
5. When the PR is merged, run `npm publish`

This process avoids any permissions errors with the current NPM hooks
and scripts.
