# Project Structure and Release Process


## How to Contribute

👍🎉 First of all, thank you for your interest in CTO.ai Node JS SDK! We'd love to accept your patches and contributions! 🎉👍

This project accepts contributions. In order to contribute, you should pay attention to a few guidelines:

## Reporting Issues

Bugs, feature requests, and development-related questions should be directed to our [GitHub issue tracker](https://github.com/cto-ai/sdk-js/issues).

When reporting a bug, please try and provide as much context as possible such as your operating system, NodeJS version and anything else that might be relevant to the bug. For feature requests, please explain what you're trying to do and how the requested feature would help you do that.


## Setup

Fork, then clone this repository:

```
git clone https://github.com/cto-ai/sdk-js.git
cd sdk-js
```

Install development dependencies

```
npm install
```
---

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


## Submitting Modifications


1. It's generally best to start by opening a new issue describing the bug or feature you intend to fix. Even if you think it's relatively minor, it's helpful to know what people are working on. Mention in the initial issue that you are planning to work on that bug or feature so that it can be assigned to you.

2. Follow the normal process of [forking](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the project, and setup a new branch to work in. Each group of change must be done in separate branches in order to ensure that a pull request only includes the commits related to that bug or feature.

3. Do your best to have [well-formated commit messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) for each change. This provides consistency throughout the project and ensures that commit messages can be adequately formatted by various git tools.

4. Finally, push the commits to your fork and submit a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)


## Once you've filed the PR:

- One or more maintainers will use GitHub's review feature to review your PR.
- If the maintainer asks for any changes, edit your changes, push, and ask for another review.
- If the maintainer decides to suggest some improvements or alternatives, modify and make improvements. Once your changes are approved, one of the project maintainers will merge them.
