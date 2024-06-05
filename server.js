//DEPENDENCIAS
import express from 'express';
import bodyParser from 'body-parser';
import {getFileContent} from './setup.js'
import path from 'path';
const __dirname = path.resolve();
import fs from 'fs';
const app = express();

//IMPORTS PROPIOS
import {extractConfig} from './setup.js'
import Config from './config.js'


//VARIABLES DE ENTORNO
const Metricas = Config.IP_Grafana
const pathVerify = "./setupState.txt"
const port = Config.Port;



app.get('/setup', function(req, res) {
    res.sendFile(path.join(__dirname, '/webpage_files/setup.html'));
  });

  app.get('/panel', function(req, res) {
    res.sendFile(path.join(__dirname, '/webpage_files/panel.html'));
  });

app.listen(port, () => {
    console.log(`Interfaz del core corriendo en ${port}`)
  })

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
    console.log(req.body)
    for(var key in req.body) {
    const value = req.body[key]
    const llave = key.toString().toUpperCase()
    await getFileContent(llave, value)
    console.log(llave)
    }
    res.sendFile(path.join(__dirname, '/webpage_files/submit.html'));

    const content = 'true';
    fs.writeFile(pathVerify, content, err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });});

app.use(express.static('webpage_files'));
app.use(express.static('static'));

app.get('/', async function(req, res) {
    const data = await fs.promises.readFile(pathVerify, 'utf8');
    if (data == "false") {
    res.sendFile(path.join(__dirname, '/webpage_files/setup.html'));
    } else {
      res.sendFile(path.join(__dirname, '/webpage_files/panel.html'));
    }
}); 


app.get('/configFile', function(req, res) {
  extractConfig().then(cfg => {
    res.send(cfg)
  });
});

app.get('/metricas', function(req, res) {
  res.redirect(`http://${Metricas}`);
});