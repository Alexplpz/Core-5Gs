import * as fs from 'fs';
import sqlite from 'sqlite3'
const dbPath = './database.db'; // Path to the database file
const db = new sqlite.Database(dbPath);

import Config from './config.js'
const path = Config.Route_ENV
import shell from 'shelljs'


export async function getFileContent(key, value) {
  try {
      // Leer el archivo
      const data = await fs.promises.readFile(path, 'utf8');
  
      // Dividir el contenido del archivo en líneas
      const lineas = data.split('\n');
  
      // Buscar la línea que contiene el texto deseado
      const indiceDeLinea = lineas.findIndex(linea => linea.includes(key));
  
      // Verificar si se encontró la línea
      if (indiceDeLinea !== -1) {
          // Modificar la línea deseada
          const nuevoTexto = key+"="+value
          lineas[indiceDeLinea] = nuevoTexto;
  
          // Unir las líneas de nuevo en una sola cadena de texto
          const nuevoContenido = lineas.join('\n');
  
          // Escribir el archivo de nuevo con los cambios
          await fs.writeFileSync(path, nuevoContenido, 'utf8');
          
          console.log(nuevoContenido)

          console.log('Se ha cambiado la configuración.');
      } else {
          console.log('Texto no encontrado en el archivo.');
      }
  } catch (err) {
      console.error(err);
  }
}


export async function extractConfig(){
    try {
        // Leer el archivo
        const data = await fs.promises.readFile(path, 'utf8');
        return data
    }  catch (err) {
        console.error(err);
    }
}

export async function extractDevices(){
    try {
        // Leer el archivo
        const query = db.prepare('SELECT * FROM devices ORDER BY id');
        query.all((err, rows) => {
            if (err) {
                console.error(err);
            } else {
                return rows;
            }
        });
    }  catch (err) {
        console.error(err);
    }
}
export async function restartCore(){
    try {
        const comando = `docker compose -f ${Config.Route_YAML} kill`;
        const comando2 = `docker compose -f ${Config.Route_YAML} up -d`;
        await shell.exec(comando);
        await shell.exec(comando2);
    }  catch (err) {
        console.error(err);
    }
}

export async function offCore(){
    try {
        const comando = `docker compose -f ${Config.Route_YAML} kill`;
        await shell.exec(comando);
    }  catch (err) {
        console.error(err);
    }
}


export async function onCore(){
    try {
        const comando2 = `docker compose -f ${Config.Route_YAML} up -d`;
        await shell.exec(comando2);
    }  catch (err) {
        console.error(err);
    }
}

