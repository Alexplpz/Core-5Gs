//DEPENDENCIAS
import express from 'express';
import bodyParser from 'body-parser';
import {getFileContent} from './setup.js'
import path from 'path';
const __dirname = path.resolve();
import fs from 'fs';
const app = express();
import shell from 'shelljs'

//IMPORTS PROPIOS
import {extractConfig, restartCore, onCore, offCore} from './setup.js'
import Config from './config.js'


//VARIABLES DE ENTORNO
const Metricas = Config.IP_Grafana
const pathVerify = "./setupState.txt"
const port = Config.Port;
var statusCore = "off"


app.get('/setup', function(req, res) {
    res.sendFile(path.join(__dirname, '/webpage_files/setup.html'));
  });

  app.get('/panel', function(req, res) {
    res.sendFile(path.join(__dirname, '/webpage_files/panel.html'));
  });

app.listen(port, () => {
    console.log(`Interfaz del core corriendo en ${port}`)
    const { stdout, stderr, code } = shell.exec('docker container list', { silent: true })
    console.log(stdout)
    if(stdout.indexOf('amf') >= 0){
      statusCore = "on"
    }

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

app.get('/statusCore', function(req, res) {
  extractConfig().then(cfg => {
    res.send(statusCore)
  });
});

app.get('/metricas', function(req, res) {
  res.redirect(`http://${Metricas}`);
});

app.get('/reload', function(req, res) {
  console.log("Reiniciando core...")
  statusCore = "on"
    res.sendFile(path.join(__dirname, '/webpage_files/reload.html'));
  restartCore("amf","docker_open5gs")

});

app.get('/on', function(req, res) {
  console.log("Encendiendo core...")
  statusCore = "on"
  res.sendFile(path.join(__dirname, '/webpage_files/panel.html'));
  onCore()

});

app.get('/off', function(req, res) {
  console.log("Apagando core...")
  statusCore = "off"
  res.sendFile(path.join(__dirname, '/webpage_files/panel.html'));
  offCore()

});