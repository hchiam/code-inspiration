# [Code Inspiration](https://code-inspiration.surge.sh)

![version](https://img.shields.io/github/release/hchiam/code-inspiration) [![Build Status](https://travis-ci.org/hchiam/code-inspiration.svg?branch=master)](https://travis-ci.org/hchiam/code-inspiration) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

Capture snippets of code inspiration while on the go. It works offline too! (After your first visit.)

<https://code-inspiration.surge.sh>

## Older demos

<https://code-inspiration-svelte.surge.sh> (built with [Svelte](https://github.com/hchiam/learning-svelte) and its [Sapper](https://github.com/hchiam/learning-sapper) framework)

and <https://code-inspiration-react.surge.sh> (built with [React](https://github.com/hchiam/learning-reactjs) and `create-react-app`)

You can run PageSpeed tests: [for the Svelte version](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fcode-inspiration-svelte.surge.sh) and [for the React version](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fcode-inspiration-react.surge.sh)

## Run locally (note: commands use [`yarn`](https://github.com/hchiam/learning-yarn) instead of `npm`)

Just once:

```bash
git clone https://github.com/hchiam/code-inspiration.git
cd code-inspiration
yarn
```

and then:

```bash
yarn dev
```

## Test

```bash
yarn test
```

## [Dependency graph](https://github.com/hchiam/learning-dependency-cruiser)

[`bash show_dep_graph.sh`](https://github.com/hchiam/code-inspiration/blob/master/show_dep_graph.sh).

### Old: (React version)

![(Dependency graph.)](https://github.com/hchiam/code-inspiration/blob/react/dependencygraph.svg)

### New: (Svelte version)

![(Dependency graph.)](https://github.com/hchiam/code-inspiration/blob/master/dependencygraph.svg)

## Build production version (you can `run` it locally too)

```bash
yarn build
```

## Export in prep for static site hosting

```bash
npx sapper export
```

## Or just publish to static site hosting in one step

```bash
yarn surge
```

⬆️ That will run `npx sapper export; surge __sapper__/export https://code-inspiration.surge.sh; open https://code-inspiration.surge.sh`
