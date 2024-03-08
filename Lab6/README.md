# NixOS Blogs

<!--toc:start-->
- [NixOS Blogs](#nixos-blogs)
  - [Documentation](#documentation)
  - [Usage](#usage)
  - [Getting started](#getting-started)
  - [Starting everything](#starting-everything)
    - [DB Server](#db-server)
    - [Backend API](#backend-api)
<!--toc:end-->

Monorepo containing everything you need to start developing the platform of NixOS Blogs.

To install the development environment I recommend using [Nix](https://nixos.org/), make sure to install it and [enable flakes](https://nixos.wiki/wiki/Flakes) by editing the `/etc/nix/nix.conf` file as the link says, but you can install everything manually if you prefer. I also recommend it since it's used to build the docker image, but you can use the one on the root of the project as well.

## [Documentation](https://elrohirgt.github.io/WebDevelopmentCourse/)
You can also check out the documentation of the API running it locally and opening `localhost:3000`

## Usage
Now you can simply call the API, for example using cURL:
```bash
curl localhost:3000/posts/5
```
## Getting started
Clone the repo and `cd` into the `Lab6` directory:
```bash
git clone {repo url here}
cd {repo location}/Lab6
```
All commands from here on out assume your `$PWD` is this directory.

Then if you have nix installed, you can run:
```bash
nix develop
```

To install everything you'll need, if not here are the dependencies:
* [NodeJS v20](https://nodejs.org/en): For running the server
* [Yarn v1.22.19](https://yarnpkg.com/): For node app package managment
* [Dprint v0.45.0](https://dprint.dev/): For formatting

## Starting everything
The project has two main project as of now, a [PostgreSQL](https://www.postgresql.org/) server to save everything data related and a backend REST API built with [ExpressJS](https://expressjs.com/es/). 

### DB Server
The DB server is containarized using Nix! To build the docker image using Nix and load it in docker you can execute:
```bash
nix build .#dbDocker
docker load < result
```

Then we recommend opening the file `.env`, change the environment variables as necessary to your environment and copy the modified `.env` inside `/backend`. If your on Linux you can just:
```bash
ln .env /backend/.env
```

To automatically link the .env file inside `Lab6` to the one inside `backend`. Saving the need to recopy it everytime you make a change.

Then you can just start a container using the image:
```bash
docker run -d --name Lab6DB_22386 -p 5433:5432 lab6_db_22386:current
```

All of this manual work is hard, thats why I created a nix script to automate it! Just make sure you have the `.env` file correctly setup and execute:
```bash
nix run .#restartDBDocker
```

Be careful tho, this command will delete all stopped containers!

### Backend API
To start the backend API simply `cd` into the `/backend` directory and run `yarn start`, like so:
```bash
cd backend
yarn start
```

This will automatically install all dependencies of the backend and start the server on port localhost:3000. This will probably be added to the .env file in the future.

