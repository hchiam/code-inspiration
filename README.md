# [Code Inspiration](https://code-inspiration.surge.sh)

Capture snippets of code inspiration while on the go.

<https://code-inspiration.surge.sh>

[![Build Status](https://travis-ci.org/hchiam/code-inspiration.svg?branch=master)](https://travis-ci.org/hchiam/code-inspiration)

## Run locally

Just once:

```bash
npm install
```

and then:

```bash
npm run build
npm start
```

## Extra info

You can run a functional test using Selenium IDE and Google Chrome:

```bash
# In one CLI terminal:
npm start
# And in another CLI terminal:
npm run side-test
```

You can generate a [dependency graph](https://github.com/hchiam/learning-dependency-cruiser) with [`bash show_dep_graph.sh`](https://github.com/hchiam/code-inspiration/blob/master/show_dep_graph.sh).

![(Dependency graph.)](https://github.com/hchiam/code-inspiration/blob/master/dependencygraph.svg)

I can publish to surge.sh with:

```bash
npm run prod-build
# will run: react-scripts build; cd build; surge
```
