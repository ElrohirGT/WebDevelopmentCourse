# Nix Blogs

Monorepo con todo el código necesario para montar Nix Blogs.

Si usas Linux o MacOS puedes utilizar los flakes de Nix para montar el sistema de desarrollo.

Para abrir la terminal de desarrollo (auto instala node, yarn y demás utilidades para desarrollar nix blogs).

```bash
nix develop
```

## Docker Image usin Nix

Para compilar la imagen de Docker para postgres:

```bash
nix build .#dbDocker
```

Esto generará un archivo `result` este es en realidad una imagen que se puede cargar dentro de docker usando el comando:

```bash
docker load < result
```
