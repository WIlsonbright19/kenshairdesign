# Ken's Hair Design

A static salon website built with React, TypeScript, and Vite.

## Run locally

Install [Node.js](https://nodejs.org/) 20.19+ or 22.12+ and then run:

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`. It is a static site and does not
need a server process, API key, or environment-specific configuration. Upload
the contents of `dist/` to any static web host, or configure the host to run
`npm run build` and publish `dist/`.

The site uses relative asset paths, so it can be published at a domain root or
under a subdirectory. Its navigation uses in-page links and does not require
host-specific rewrite rules.
