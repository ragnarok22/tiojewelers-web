Para producción
---------------
- Ir al archivo config.js que se encuentra en la carpeta config (./config/config.js) y colocar la direccion del API:
  - `SERVER_URL`: es la dirección en la que se encuentra el API. Ejemplo `http://miapi.com/api`
  (No debe terminar en `/`)

Una vez configurado el config.js se procede a ejecutar `npm run build`. Este comando creará la carpeta `out` donde estará todo el código compilado. Es el que se sube al servidor