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
        "aarch64-macos"
      ] (system:
        function (import nixpkgs {
          inherit system;
          config.allowUnfree = true;
          overlays = [
            #inputs.something.overlays.default
          ];
        }));
    dbImageName = "lab6_db_22386";
    dbImageTag = "current";
    dbContainerName = "Lab6DB_22386";
  in {
    packages = forAllSystems (pkgs: {
      dbDocker = pkgs.dockerTools.buildImage {
        name = dbImageName;
        tag = dbImageTag;
        created = "now";
        fromImage = pkgs.dockerTools.pullImage {
          imageName = "postgres";
          # Obtained using `nix run nixpkgs#nix-prefetch-docker -- --image-name postgres --image-tag 16`
          imageDigest = "sha256:f58300ac8d393b2e3b09d36ea12d7d24ee9440440e421472a300e929ddb63460";
          sha256 = "1dpmibx8llrnsa9slq8cvx2r7ppsicxxf6kwaz00lnyvp9hwhs0k";
          finalImageTag = "16";
        };

        copyToRoot = let
          makeDerFromFile = file: pkgs.writeTextDir "docker-entrypoint-initdb.d/${file}" (builtins.readFile ./db/${file});
          dbInitscript = makeDerFromFile "init.sql";
          dbBlogsInsertScript = makeDerFromFile "insert_blog_posts.sql";
          dbLinksInsertScript = makeDerFromFile "insert_external_links.sql";
        in
          pkgs.buildEnv {
            name = "image-root";
            paths = [dbInitscript dbBlogsInsertScript dbLinksInsertScript];
            pathsToLink = ["/docker-entrypoint-initdb.d"];
          };

        config.Entrypoint = "/usr/local/bin/docker-entrypoint.sh";
        config.Cmd = ["postgres"];
        config.Env = [
          "POSTGRES_PASSWORD=myPassword"
        ];
      };
    });

    devShells = forAllSystems (pkgs: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_20
          yarn
        ];
      };
    });

    apps = forAllSystems (pkgs: {
      restartDBDocker = let
        appName = "restartLab6DB";
        app = pkgs.writeShellApplication {
          name = appName;
          text = ''
            echo WARNING: This command should be executed inside the root of the directory!
            docker stop ${dbContainerName} || true # Ignore error
            echo y | docker container prune
            docker rmi ${dbImageName}:${dbImageTag} || true # Ignore error

            if nix build .#dbDocker && docker load < result; then
            	set -o allexport
            	# shellcheck disable=SC1091
            	. .env
            	set +o allexport
            	docker run -d --name ${dbContainerName} -p "''$DB_PORT":5432 ${dbImageName}:${dbImageTag}
            fi
          '';
        };
      in {
        type = "app";
        program = app.outPath + "/bin/${appName}";
      };
    });
  };
}
