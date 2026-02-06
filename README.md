# JSON Shuttle

A small web app to validate, format, repair, and escape JSON. Everything runs in the browser; no data is sent to any server.

## Features

- **Validate** – Parse JSON and see errors with line/column
- **Beautify / Minify** – Format or compress JSON
- **Repair** – Fix common issues (trailing commas, unquoted keys, etc.) via [jsonrepair](https://github.com/josdejong/jsonrepair)
- **Escape / Unescape** – JSON string escaping

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```
