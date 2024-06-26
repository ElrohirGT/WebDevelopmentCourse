{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    forAllSystems = function:
      nixpkgs.lib.genAttrs [
        "x86_64-linux"
        "x86_64-macos"
        "aarch64-linux"
        "aarch64-darwin"
      ] (system:
        function {
          pkgs = import nixpkgs {
            inherit system;
            config.allowUnfree = true;
            overlays = [
              #inputs.something.overlays.default
            ];
          };
          system = system;
        });
  in {
    devShells = forAllSystems ({
      pkgs,
      system,
    }: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_20
          yarn
          dprint
        ];
      };
    });
  };
}
