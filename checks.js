import fs from 'fs';
let contenidoAntiguo =""
let UEs = 0
let IMSI = ""
let IPs = ""
let endUserData = ""
let currentCount = 0

export function extraerNumeroDeLinea(linea) {
    const regex = /\d+/;
    const match = linea.match(regex);
    if (match) {
        return parseInt(match[0]);
    } else {
        return null;
    }
}

export function checkUES(d) {
    const lines = d.split('\n')
    let lastline = ""
    let numero = 0
    lines.forEach(line => {
        const finalValue = line.substring(20)
        const values = splitValue(finalValue, 'SMF-UEs')

        if (values[1] != undefined) {
            numero = extraerNumeroDeLinea(values[1])
        } else {
            lastline = lastline + '\n' + finalValue
        }

    })
    return numero
}



export function checkImsi(d) {
    const lines = d.split('\n')
    let lastline = ""
    let imsi = 0
    lines.forEach(line => {
        const finalValue = line.substring(20)
        if (finalValue.match('APN') != null) {
            const values = splitValue(finalValue,'IMSI','APN')
            imsi = values[0]
            if (values[1] != undefined) {
            } else {
                lastline = lastline + '\n' + finalValue
            }
        }

    })
    return imsi
}

export function checkIP(d) {
    const lines = d.split('\n')
    let lastline = ""
    let IP = ""
    lines.forEach(line => {
        const finalValue = line.substring(20)
        if (finalValue.match('APN') != null) {
            const values = splitValue(finalValue,'IPv4','IPv6')
            // const values = finalValue.split('(..')[0].split('IPv4')[1].split('IPv6')
            if (values[1] != undefined) {
                IP = values[0]
            } else {
                lastline = lastline + '\n' + finalValue
            }
        }

    })
    return IP
}
setInterval(getIMSI, 1000)
export async function getIMSI() {
  await fs.promises.readFile('./file.txt', 'utf8', function (err, data) {
      if (err){
          console.log(err)
      }
  }).then(d =>  
      {  
          if (contenidoAntiguo != d ) {
              contenidoAntiguo = d
             UEs = checkUES(d)
             IPs = checkIP(d)
             IMSI = checkImsi(d)
            console.log("Cambio")
            writeDatabase()
            currentCount++
           } else return
           


          
  }
  )

endUserData = `#${currentCount}` + '\n' + `UE: ${UEs}` + '\n' + `IP: ${IPs}` + `\n` + `IM: ${IMSI}\n`
console.log(endUserData) 
}




function splitValue(value, toSplit, secondSplit){
    if (secondSplit != undefined) {
        let correctValue = value.split('(..')[0].split(toSplit)[1].split(secondSplit)
        return correctValue

    } else {
        let correctValue = value.split('(..')[0].split(toSplit)
        return correctValue
    }
}

async function writeDatabase() {
    await fs.promises.readFile('./devices.txt', 'utf8', function (err, data) {
        if (err){
            console.log(err)
        }
    }).then(n =>  
        {  
             fs.writeFileSync('./devices.txt', endUserData + n, 'utf8');

    })
}

export async function prepareFile(){
    try {
        // Leer el archivo
        fs.writeFileSync('./devices.txt', "", 'utf8');
    }  catch (err) {
        console.error(err);
    }
}
