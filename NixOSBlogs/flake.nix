{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-23.11";
    systems.url = "github:nix-systems/default";
    rust-overlay.url = "github:oxalica/rust-overlay";
    devenv = {
      url = "github:cachix/devenv";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    fenix = {
      url = "github:nix-community/fenix";
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
    rust-overlay,
    devenv,
    ...
  } @ inputs: let
    overlays = [(import rust-overlay)];
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    packages = forEachSystem (
      system: let
        pkgs = import nixpkgs {inherit system overlays;};
      in {
        # For setting up devenv
        devenv-up = self.devShells.${system}.default.config.procfileScript;

        build-web-server = pkgs.writeShellApplication {
          name = "NixOS Blogs WebServer build";
          runtimeInputs = with pkgs; [
            ansi
            zip
          ];

          text = ''
            echo -e "$(ansi yellow)Building frontend...$(ansi reset)"
            nix develop --extra-experimental-features flakes --extra-experimental-features nix-command --impure --command bash -c "cd ./nixos_blog_frontend/ && yarn build"

            echo -e "$(ansi yellow)Deleting static dir in backend if exists...$(ansi reset)"
            rm -r ./nixos_blog_backend/static/ || rm -r ./nixos_blog_backend/static || true

            echo -e "$(ansi yellow)Copying frontend build to backend...$(ansi reset)"
            cp -r ./nixos_blog_frontend/dist ./nixos_blog_backend/static

            echo -e "$(ansi yellow)Installing backend dependencies...$(ansi reset)"
            nix develop --extra-experimental-features flakes --extra-experimental-features nix-command --impure --command bash -c "cd ./nixos_blog_backend/ && yarn"
          '';
        };
      }
    );

    devShells = forEachSystem (system: let
      pkgs = import nixpkgs {inherit system overlays;};
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
          }
        ];
      };
    });
  };
}
