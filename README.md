# www.evantahler.com

[![Build Status](https://circleci.com/gh/evantahler/www.evantahler.com.png)](https://circleci.com/gh/evantahler/www.evantahler.com)

## Install
This is a [React Project](https://facebook.github.io/react/) utilizing [next.js](https://github.com/zeit/next.js/) and [react-bootstrap](https://react-bootstrap.github.io/)

- `npm install`

## Running in Development
- `npm run dev`

## Building for Production

(see `./bin/deploy`)

The master branch of this repository is automatically built and pushed to the `gh-pages` branch of this project by Circle.CI on a successful test run.  We statically host this project on www.evantahler.com via github pages.

## Linting

We use [prettier](https://prettier.io) to manage our lint rules.  We run `prettier --check` as part of our test suite, and your contributions must pass.  Prettier is *very* opinionated and inflexible such that we cannot inject our own opinions.  There are no eslint/jshint files to manage in this project.

## CSS
- we use a default boostrap CSS file
- all components provide thier own CSS inline

