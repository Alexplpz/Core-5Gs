
var url = 'http://localhost:5000/devicesFile';
let storedText = ""
let validText = ""
let currentUE = ""
let oldUE = ""



searchPage()
setInterval(searchPage, 2000)

function searchPage(){
  fetch(url)
    .then(function(response) {
      console.log(response)
      response.text().then(async function(text) {
        storedText = text;
        let numero = await storedText.split("/n")[0].split("#")[1].split("UE: ")[0]
        done(numero)
      });
    });
}


async function done(times){
  
  for (let i = 0; i < times; i++) {
    console.log(`Iteración número ${i + 1}`);
    if (i === 0) {
      validText = storedText.split(`#${i + 1}`)[1]
      // addData ()
    } else{
     validText = storedText.split(`#${i + 1}`)[1].split(`#${i}`)[0]
    }
  }

  
  let currentUE = storedText.split("\n")[0]

  if (currentUE != oldUE) {
    addData()
    console.log("Estoy")
    oldUE = currentUE
  }
 
  
}

// function reloadPage() {
//   window.location.replace(`${window.location.href}`);
// }

function addData(){
  const devicesList = document.getElementById(`devices`);
  const newDevice = document.createElement('li');
  newDevice.innerHTML = validText;
  devicesList.appendChild(newDevice);
}