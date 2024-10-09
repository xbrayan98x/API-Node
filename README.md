# Node js API

API construida con el fin de realizar prueba técnica Desarrollador Backend. Incluye RCAB (role based access control) y CRUD de negocio

## Tecnologías

- Docker - plataforma de software que permite crear, desplegar y ejecutar aplicaciones en contenedores
- Postgres- sistema de gestión de bases de datos relacional de código abierto, conocido por su robustez, escalabilidad y conformidad con los estándares SQL
- node.js - entorno de ejecución para JavaScript en el lado del servidor
- Express -  framework web para Node.js que simplifica la creación de aplicaciones y APIs web

## EJecución del Backend

El proyecto puede ser ejecutado con Docker o sin la misma. En el caso de ser ejecutado sin docker asegurese de tener instalado Postgres en su equipo.

Una vez descargado el proyecto del repositorio y en caso de querer ejecutar con docker lo que no haremos es la ejecución de instalacion de dependencias ya que al momento de generar la Imagen puede que hayan problemas de arquitectura con paquetes.

Generar imagen con Docker y Levantamiento de contenedor. El último comando nos debería de mostrar que el servidor se encuentra corriendo en el puerto que se le configure
```sh
docker build -t sginnova .
docker compose up -d
docker compose logs app
```

El DockerFile será el encargado de realizar la instalación de dependencias dentro del mismo contenedor evitando así problemas de arquitectura con las dependencias.

Una vez haya ejecutado los comandos de docker conectese a la BD por medio de alguna herramienta que le permita administrar la Base de datos y ejecute el contenido que hay en la carpeta ```scripts/main-db.sql``` para creación de tablas del Negocio

En el caso de querer correr el proyecto de manera local sin Docker realizar instalacion de dependencias y ejecución del backend en modo desarrollador (watch mode). Recuerde ajustar la conexion de la BD en el fichero ```dbjs```
```sh
npm i
npm run dev
```

La ruta base del API es
```sh
host/api/v1
```

Endpoints:

Nota: En cada controlador podrá ver que se requiere en el body o si es GET que requiere a nivel de paramentros. Tambien alguno de los endpoints cuenta con validadores No todos.

```sh
- host:port/api/v1/users/login -> Este devuelve el JWT
- host:port/api/v1/users -> Metodo POST (creacion de usuario)
- host:port/api/v1/projects -> Metodos POST, GET, PUT, DELETE
- host:port/api/v1/tasks -> Metodos POST, GET, PATCH, DELETE
```
