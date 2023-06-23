# OpenDoor
apertura autmática de puertas


## Funcionalidades
Permite darle a los usuarios links de apertura de puerta de distintos edificios.


## FrontEnd con Vite
impelmentamos vite para desarrollar fronentds mas rápidamente

durante las pruebas se testea VITE usando `pnpm run dev` y obteniendo la fuente de `cliente/src`
para hacer un build se hace `pnpm run build` la cual creará la carpeta `client/dist`

Vite utiliza Rollup para realizar el build. En `vite.config.js` necesitamos especificar los endpoints a copiar.
En nuestro caso procesaremos `index.html` y `backend.html` que debería llamarse `admin-panel` en vez de backend para no confundir.

[Pruebas Vite](http://localhost:5173)

## BackEnd con Express y Node

Una vez hecho el build del FrontEnd utilizamos `pnpm run dev2` para ejecutar el BACKEND con Node.
Esto es hasta que aprendamos a configurar VITE para que también ejecute el backend.

[Full Stack + Backend](http://localhost:3000)


## Tareas
- [ ] renombrar `backend.html` a `admin-panel`
- [ ] ver de ejecutar el backend con VITE
- [ ] Login de Usuarios correct
- [ ] Que ocurre con `.env` en producción??