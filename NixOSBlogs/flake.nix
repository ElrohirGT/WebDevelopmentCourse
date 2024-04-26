{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-23.11";
    systems.url = "github:nix-systems/default";
    devenv = {
      url = "github:cachix/devenv";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = {
    self,
    nixpkgs,
    systems,
    devenv,
    ...
  } @ inputs: let
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
    postgresHost = "127.0.0.1";
    postgresPort = 5566;
  in {
    packages = forEachSystem (
      system: let
        pkgs = import nixpkgs {inherit system;};
      in {
        # For setting up devenv
        devenv-up = self.devShells.${system}.default.config.procfileScript;

        restartServices = pkgs.writeShellApplication {
          name = "Sanitas dev server restarter";
          runtimeInputs = with pkgs; [ansi];
          text = ''
            echo -e "$(ansi yellow)"WARNING:"$(ansi reset)" This script must be run on the project root directory!

            echo "Trying to remove old .devenv..."
            rm ./.devenv/state/postgres || rm -r ./.devenv/state/postgres || true

            echo "Entering devshell..."
            nix develop --impure . -c devenv up
          '';
        };

        build-web-server = pkgs.writeShellApplication {
          name = "NixOS Blogs WebServer build";
          runtimeInputs = with pkgs; [
            ansi
          ];

          text = ''
                  echo -e "$(ansi yellow)Building frontend...$(ansi reset)"
                  nix develop --extra-experimental-features flakes --extra-experimental-features nix-command --impure --command bash -c "cd ./nixos_blog_frontend/ && yarn build"
            rm -r ./nixos_blog_frontend/node_modules || rm ./nixos_blog_frontend/node_modules || true

                  echo -e "$(ansi yellow)Deleting static dir in backend if exists...$(ansi reset)"
                  rm -r ./nixos_blog_backend/static/ || rm ./nixos_blog_backend/static || true

                  echo -e "$(ansi yellow)Copying frontend build to backend...$(ansi reset)"
                  cp -r ./nixos_blog_frontend/dist ./nixos_blog_backend/static
          '';
        };
        run-web-server = pkgs.writeShellApplication {
          name = "NixOS Blogs WebServer run";
          runtimeInputs = with pkgs; [
            ansi
          ];

          text = ''
            echo -e "$(ansi yellow)Starting server... $(ansi reset)"
                  nix develop --extra-experimental-features flakes --extra-experimental-features nix-command --impure --command bash -c "cd ./nixos_blog_backend/ && yarn start"
          '';
        };
      }
    );

    devShells = forEachSystem (system: let
      pkgs = import nixpkgs {inherit system;};
      strFromDBFile = file: builtins.readFile ./db/${file};
      dbInitFile = builtins.concatStringsSep "\n" [(strFromDBFile "init.sql") (strFromDBFile "tables.sql")];
    in {
      default = devenv.lib.mkShell {
        inherit pkgs inputs;
        modules = [
          {
            packages = with pkgs; [
              dprint # Javascript formatter
              oxlint # Javascript linter
              awscli2
            ];

            languages.javascript = {
              enable = true;
              yarn = {
                enable = true;
              };
            };

            services.postgres = {
              enable = true;
              listen_addresses = postgresHost;
              port = postgresPort;
              initialScript = dbInitFile;
              settings = {
                log_connections = true;
                log_statement = "all";
                logging_collector = true;
                log_disconnections = true;
                log_destination = "stderr";
              };
            };
          }
        ];
      };
    });
  };
}
