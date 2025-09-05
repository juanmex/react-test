# README
Para arranncar el proyecto sigue estos pasos:

1. Instala docker
2. Clona el repositorio

## Comandos útiles
```
make build # Para hacer el build del proyecto
make start # Para arrancar los containers
make stop  # Para parar los containers
make bash # Para una terminal bash
```

## Para agregar librerias
```
docker compose run --rm app npm install --save-dev NOMBRE_LIBRERIA
```
