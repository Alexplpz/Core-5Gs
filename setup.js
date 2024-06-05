//const textoBuscado = "MCC"
//const nuevoTexto = "MCC=005"
//import shell from 'shelljs';
import * as fs from 'fs';
//const path = "./.env"
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

export async function restartCore(nombreContenedor, imagenDocker){
    try {
        const comando = `docker run -d --name ${nombreContenedor} ${imagenDocker}`;
        await shell.exec(comando);
    
    }  catch (err) {
        console.error(err);
    }
}
