# JSON Shuttle

A small web app to validate, format, repair, and escape JSON. Everything runs in the browser; no data is sent to any server.

## Features

- **Validate** – Parse JSON and see errors with line/column
- **Beautify / Minify** – Format or compress JSON
- **Repair** – Fix common issues (trailing commas, unquoted keys, etc.) via [jsonrepair](https://github.com/josdejong/jsonrepair)
- **Escape / Unescape** – JSON string escaping

## Tech

- [Next.js](https://nextjs.org/) 15, [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- TypeScript
- i18n: English & 中文

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

## Deploy (Cloudflare Pages)

See `docs/CLOUDFLARE_DEPLOY.md`. In short:

```bash
npm run pages:build
npm run deploy
```

## License

Private / all rights reserved.
