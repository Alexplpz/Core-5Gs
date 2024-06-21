
var url = 'http://localhost:5000/devicesFile';
var url2 = 'http://localhost:5000/statusDevices';
let storedText = ""
let oldText = ""
let number = ""
let cookie = ""
function checkChanges(){
fetch(url2)
  .then(function(response) {
    response.text().then(async function(text) {
      number = text;
      if (document.cookie == "") {
        console.log("entrando")
        cookie = document.cookie = "time=0"
        searchPage()
        return
        
      } else {
        cookie = document.cookie.split("=")[1]
      }
      if (cookie != number) {
        searchPage()
      }

    });
  });
}

function searchPage(){
  fetch(url)
    .then(function(response) {
      response.text().then(async function(text) {
        storedText = text;
        let numero = await contarLetra(storedText, "#");
        done(numero)
      });
    });
}

async function done(times){
  let validText = ""
  
  for (let i = 0; i < times; i++) {
    console.log(`Iteración número ${i + 1}`);
    if (i === 0) {
      validText = storedText.split(`#${i + 1}`)[1]
    } else{
     validText = storedText.split(`#${i + 1}`)[1].split(`#${i}`)[0]
    }


  // window.location.replace(`${window.location.href}`);
}
const devicesList = document.getElementById(`devices`);
const newDevice = document.createElement('li');
newDevice.innerHTML = validText;
devicesList.appendChild(newDevice);
console.log("Distinto")
document.cookie = "time= " + number
  // reloadPage()

  // const lines = storedText.split('\n')
  // const values = lines.split('#1')[0].split('#2')

}

function contarLetra(texto, letra) {
  let contador = 0;
  for (let i = 0; i < texto.length; i++) {
      if (texto[i] === letra) {
          contador++;
      }
  }
  return contador;
}

setInterval(checkChanges, 1000)

function reloadPage() {
  window.location.replace(`${window.location.href}`);
}