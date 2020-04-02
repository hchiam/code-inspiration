# [Code Inspiration](https://code-inspiration.surge.sh)

Capture snippets of code inspiration while on the go. It works offline too! (After your first visit.)

<https://code-inspiration.surge.sh>

![version](https://img.shields.io/github/release/hchiam/code-inspiration) [![Build Status](https://travis-ci.org/hchiam/code-inspiration.svg?branch=master)](https://travis-ci.org/hchiam/code-inspiration)

## Run locally

Just once:

```bash
git clone https://github.com/hchiam/code-inspiration.git
cd code-inspiration
npm install
```

and then:

```bash
npm run build
npm start
```

## Extra info

You can run E2E tests using Cypress: (good for rapid feedback)

```bash
# In one CLI terminal:
npm start
# And in another CLI terminal:
npm run cypress-test
```

You can run E2E tests using Selenium WebDriver: (good for testing on a variety of browsers)

```bash
# In one CLI terminal:
npm start
# And in another CLI terminal:
npm run selenium-test
```

You can generate a [dependency graph](https://github.com/hchiam/learning-dependency-cruiser) with [`bash show_dep_graph.sh`](https://github.com/hchiam/code-inspiration/blob/master/show_dep_graph.sh).

![(Dependency graph.)](https://github.com/hchiam/code-inspiration/blob/master/dependencygraph.svg)

I can publish to surge.sh with:

```bash
npm run prod-build
```

⬆️ That will run `react-scripts build; surge build https://code-inspiration.surge.sh; open https://code-inspiration.surge.sh`
