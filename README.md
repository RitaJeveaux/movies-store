# Movie Catalog (Angular)

**Status:** Implemented with internationalization, Angular Material UI, and connects to the movies API from Prof. Luis Fernando Bicalho.

## Overview

Movie Catalog is an Angular application to browse, search, add, edit and delete movies. The UI uses Angular Material components and supports internationalization (English and Portuguese) through JSON translation files located in `public/assets/i18n/` (`en.json`, `pt.json`). The project is intended to run locally together with the example API provided by Prof. Luis Fernando Bicalho: `https://github.com/Kirink212/api-examples` (movies-api).

## Technologies

- Angular (version used in project)
- Angular Material
- RxJS
- TypeScript
- HTML / SCSS
- Node.js & npm
- The backend API: `movies-api` from Kirink212 (Professor Luis Fernando Bicalho)

## Project structure (high level)

```
/public/assets/i18n/   # translation JSON files (en.json, pt.json)
src/
  app/
    modules/
    components/
    services/
    models/
  assets/
  environments/
angular.json
package.json
README.md
```

## Internationalization (i18n)

Translations are provided in `public/assets/i18n/en.json` and `public/assets/i18n/pt.json`. The app loads the appropriate JSON at runtime using a translation loader (for example `@ngx-translate/core` with `TranslateHttpLoader`) or a custom service that fetches `/assets/i18n/{lang}.json`.

Example usage in templates:
```html
<h1>{ 'HOME.WELCOME' | translate }</h1>
<button mat-button>{ 'MOVIE.ADD' | translate }</button>
```

## Prerequisites

- Node.js (>= 16 recommended)
- npm (>= 8) or yarn
- Angular CLI (optional, for development): `npm install -g @angular/cli`
- The example backend API (clone and run locally): `https://github.com/Kirink212/api-examples` (see instructions below)

## How to run the project locally

1. Clone this frontend repo or extract the ZIP.
2. Install dependencies:
```bash
npm install
```
3. Run the backend API locally:
```bash
# clone the API examples (movies-api)
git clone https://github.com/Kirink212/api-examples.git
cd api-examples/movies-api
npm install
npm run start
```
The backend will run on `http://localhost:3000` (confirm the port in the API README or code). The frontend expects the API to be available locally — update `environment.ts` if the API runs on another port.

4. Run the frontend:
```bash
ng serve --open
```
Or
```bash
npm start
```
The app will open at `http://localhost:4200`.

## Configuration

- API base URL: configured in `src/environments/environment.ts` as `apiUrl`. Set to `http://localhost:3000` when running locally with the professor's API.
- i18n files location: `public/assets/i18n/{lang}.json`

## Scripts

- `npm start` — starts the frontend dev server (maps to `ng serve`)
- `npm run build` — builds the app for production
- `npm test` — runs unit tests (if configured)
- `npm run lint` — runs linter (if configured)

## Notes about the backend API

This frontend was built to work with the `movies-api` example provided in the referenced GitHub repository. That API exposes endpoints to list, get, create, update, and delete movies. Adjust `environment.apiUrl` if the API runs on a different host/port.

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m "feat: description"`
4. Push and open a Pull Request

## License

MIT
## O que ainda falta:

- [ ] atualizar quantidade de movies no serve depois da compra
- [ ] crud completo do user com restrição para edit e delete
- [X] criar botoes no cart para limpar o cart e para pagar(checkout)
- [X] formatar o display do cart - quase lá
- [ ] implementar a tradução
- [ ] implementar modulo de pagamentos

Feedback da API

- [ ] as imagens dos poster, quando edit do movie, a imagem recebe novo id e a imagem "descartada" permanece no server
- [ ] user só tem username, email, password - não tem o role

## Automatic string extraction for i18n

- Detectei e extraí 165 strings do código (templates e arquivos .ts). Elas foram adicionadas em `public/assets/i18n/en.json` e `pt.json` sob a chave `UI`.
- Algumas traduções em PT são suposições e devem ser revisadas manualmente.
