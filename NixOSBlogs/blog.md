# What is Nix? Part 1

[Nix](https://nixos.org/) is a package manager, programming language and operating system. It's a really big world, the following image helps describing what nix is about:

![Nix declarative trinity](https://preview.redd.it/cg6rhnnw9b581.png?auto=webp&s=ccafd2bb97afddf3d32a3d57f21bca2e63f6facc)

This blog aims to be an introductory blog to the Nix ecosystem and all it's wonders that it offers.

## The package manager
I think it's easier to start by seeing why is Nix useful and learn the language or the OS along the way. Normal package managers (like apt or pacman) concern themselves only in installing packages and resolving dependencies, sometimes they can compile your packages if a mirror is not found, nix does all of this and adds the special sauce, **complete reproducibility** on supported platforms (Linux and mostly MacOS M1 or Intel).

What does **complete reproducibility** mean exactly? Nix has a concept called derivations, derivations are kind of recipes that encapsulate all the necessary steps to install/compile a package in a system. The details on how you define this derivations are beyond the scope of this blog but by design they need some parameters like for example having a HASH of the output of the derivation that makes it easy to check if something has changed or not when we try to rebuild it. 

Furthermore, Nix installs it's packages in a place called the nix **store**. The Nix store is a partition in your disk that Nix creates when it's installed and it's a place where only Nix can change the contents of it. This guarantees that all changes made to the store can only be achieved by executing derivations.

### How does a derivation look like?
Here's an example of a shell derivation that we could use to setup a javascript development environment:
```nix
# shell.nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  packages = with pkgs; [
    nodejs_20
    dprint # Javascript formatter
    oxlint # Javascript linter
  ];
}
```

To use the shell environment above you can run the following command:
```bash
# In the same direction as shell.nix
nix-shell
```

Now if you didn't have nodejs installed on your system or some of the formatters Nix will create a bash session where they are available for you to use!

### How's this reproducible?
Well it isn't yet. At least not guaranteed. For complete reproducibility we would need to use [nix flakes](https://nixos.wiki/wiki/Flakes). But for now, this `shell.nix` is guaranteed to work on every computer that has the same nix channel as you.

### What are Nix channels?
Nix channels are the way in which Nix downloads the recipes to build derivations that you specified. You see Nix has it's central [repository of derivations in github](https://github.com/NixOS/nixpkgs)! So anyone can contribute and add packages, but this also means that if you run the `shell.nix` supplied above today and I try to run it in 5 years, there's going to be a lot of commits in between, some of them may break or remove some of the packages that my `shell.nix` needs to compile so it will fail!

There are ways to overcome this, for example you can pin the pkgs version:
```nix
# shell.nix
{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/e0629618b4b419a47e2c8a3cab223e2a7f3a8f97.tar.gz") {}}:
pkgs.mkShell {
  packages = with pkgs; [
    nodejs_20
    dprint # Javascript formatter
    oxlint # Javascript linter
  ];
}
```

You can use the [nix versions](https://lazamar.co.uk/nix-versions/) website to get the commits to include inside the `fetchTarball` function.

Remember to check the [documentation for pkgs.mkShell](https://ryantm.github.io/nixpkgs/builders/special/mkshell/) and [Nix Packages](https://search.nixos.org/packages) to search which packages are available.

Another way of overcoming this Nix channels issue, is with nix flakes, as previously mentioned, but this is a more advanced concept that will be covered in later parts.
