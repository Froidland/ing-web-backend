## Requirements
```
- Node.js v16 o superior (se probaron v16.18.1 y v18.12.1)
```

## Running the app
Antes de correr la aplicacion se debe hacer una instalacion del cliente prisma y tambien de las dependencias requeridas por el proyecto para luego migrar el esquema de datos ubicado en la carpeta prisma del directorio raiz.


```bash
$ npm install
```

Para realizar la migracion, se debe crear un archivo .env tal como se indica en .env-example y rellenarlo con los datos necesarios. Esto asume que se cuenta con un servidor MySql o MariaDB y un usuario con permisos administrativos dentro de esta.

Luego se ejecutan los siguientes comandos:

```bash
$ npx prisma generate

$ npx prisma migrate deploy
```

Luego, para correr la aplicacion, ejecute los siguientes comandos dependiendo del modo en el que desee ejecutar la aplicacion:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Team members

```bash
- Francisco Hauva
- Eric Lolli
```
