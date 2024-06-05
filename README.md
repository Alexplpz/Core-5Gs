# Digiytal Entorno CORE 5G 

Este es un entorno gráfico para un core 5G, debe ser alojado junto al SMF o en su defecto, en el mismo servidor que contenga el archivo de configuración del mismo (a no ser que este esté expuesto a la red con una ruta o como un recurso compartido)

# ✅ Dependencias 
NODE JS > 16.x.x
NPM O PNPM, versión a gusto del usuario (Bun no es válido para este proyecto)
Un fichero de configuración .env (como el de Open5GS)

# ❔ ¿Como instalar? 

Para la primera instalación:

1. Modificar las variables necesarias en config.js (NO MODIFICAR NINGUN OTRO ARCHIVO A NO SER QUE SE TENGA CONOCIMIENTO PARA ELLO)
2. Instalar las dependencias mencionadas anteriormente
3. Abrir una terminal y ejecutar los comandos:

- Si se usa NPM - 
npm run setupn
- Si se usa PNPM -
pnpm run setupp

# ❓ Una vez instalado 
- Si se usa NPM - 
npm run core
- Si se usa PNPM - 
pnpm run core

Todos los derechos reservados para Digiytal SLU que emplea una licencia MIT contenida en el archivo correspondiente en esta misma carpeta.