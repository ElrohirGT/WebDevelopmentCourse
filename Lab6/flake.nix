{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
	let
    forAllSystems = function:
      nixpkgs.lib.genAttrs [
        "x86_64-linux"
        "x86_64-macos"
        "aarch64-linux"
        "aarch64-macos"
      ] (system:
        function (import nixpkgs {
          inherit system;
          config.allowUnfree = true;
          overlays = [
            #inputs.something.overlays.default
          ];
        }));
	in
	{
		packages = forAllSystems(pkgs: {
			dbDocker = pkgs.dockerTools.buildImage {
				name = "Lab6_DB";
				fromImage = pkgs.dockerTools.pullImage {
					imageName = "postgres";
					# Obtained using `nix run nixpkgs#nix-prefetch-docker -- --image-name postgres --image-tag 16`
					imageDigest = "sha256:f58300ac8d393b2e3b09d36ea12d7d24ee9440440e421472a300e929ddb63460";
					sha256 = "1dpmibx8llrnsa9slq8cvx2r7ppsicxxf6kwaz00lnyvp9hwhs0k";
					finalImageTag = "16";
				};
				copyToRoot = pkgs.buildEnv {
					name = "image-root";
					paths = [./db];
					pathsToLink = [ "/docker-entrypoint-initdb.d" ];
				};
			};
		});
  };
}
