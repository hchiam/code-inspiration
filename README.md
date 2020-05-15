# [Code Inspiration](https://code-inspiration.surge.sh)

![version](https://img.shields.io/github/release/hchiam/code-inspiration) [![Build Status](https://travis-ci.org/hchiam/code-inspiration.svg?branch=master)](https://travis-ci.org/hchiam/code-inspiration)

Capture snippets of code inspiration while on the go. It works offline too! (After your first visit.)

<https://code-inspiration-v2.surge.sh> (built with [Svelte](https://github.com/hchiam/learning-svelte) and its [Sapper](https://github.com/hchiam/learning-sapper) framework)

and <https://code-inspiration.surge.sh> (built with [React](https://github.com/hchiam/learning-reactjs) and `create-react-app`)

## Run locally

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

![(Dependency graph.)](https://github.com/hchiam/code-inspiration/blob/master/dependencygraph.svg)

## Build production version (you can `run` it locally too)

```bash
yarn build
```

## Export in prep for static site hosting

```bash
yarn export
```

## Publish

```bash
yarn surge
```

⬆️ That will run `npx sapper export; surge __sapper__/export https://code-inspiration-v2.surge.sh; open https://code-inspiration-v2.surge.sh`
