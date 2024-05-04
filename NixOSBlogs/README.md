![NixOS banner](https://lantian.pub/usr/uploads/202110/nixos-social-preview.png)

# NixOS Blogs
[![NodeJS Blogs CI/CD](https://github.com/ElrohirGT/WebDevelopmentCourse/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ElrohirGT/WebDevelopmentCourse/actions/workflows/node.js.yml)

This project uses [Nix](https://nixos.org/) for development. You don't need to install it but it would help!

Checkout the project in [production](https://nixos-blogs.up.railway.app/)!

---
## Setup

If you have [Nix](https://nixos.org/) with [Nix flakes](https://nixos.wiki/wiki/Flakes) enabled you can simply run:
```bash
nix develop --impure
```

To enter a development shell with all the necessary dependencies installed and configured.

If not, please install:
* [yarn](https://yarnpkg.com/)
* [nodejs](https://nodejs.org/en)
* [oxlint](https://oxc-project.github.io/docs/guide/usage/linter.html)
* [dprint](https://dprint.dev/)

---
## Development

This is a monorepo, so frontend, backend and db configuration are all in the same repo. To access each project simply enter the directory of the project. If your using nix simply run:
```bash
nix run .#restartServices
```
To start the Postgres DB, backend API and frontend server in development mode!

### Backend
The backend uses [ExpressJS](https://expressjs.com/) to create a REST API. You can run the backend with `yarn dev`. You can also use `yarn run` to list all the commands defined in the project, like formatting, linting and unit testing!

### Frontend
The frontend is built using [Vite](https://vitejs.dev/) with [React](https://react.dev/). It has almost the same commands as the backend with an exception of `yarn run test` and the new command `yarn build` which builds the project into a static site.


### DB
The database is a PostgreSQL database, the scripts to initialize the DB are contained inside the `db/` directory. Nix autoinitialises the DB when running:
```nix
nix run .#restartServices
```

---
## Deployment
Deployment is automated using CI/CD with github actions and [railway](https://railway.app/). Just push to main and let CI/CD take care of deployment you latests changes!
