const valoresPregunta1 = [true, 5, false, "hola", "adios",2];

// console.log(valoresPregunta1);
const textoMayor =  (valoresPregunta1) =>{
    let textoB =[];
    let cont = 0;
    for (let i=0; i < valoresPregunta1.length; i++){
        if (typeof valoresPregunta1[i] === 'string') {
            textoB.push(valoresPregunta1[i]);            
        }
    }
    for (let i=0; i < textoB.length; i++){
        cont = textoB[i];
        if (textoB[i].length > cont) {
            cont = textoB[i];            
        }
    }
return cont;
}
textoMayor(valoresPregunta1);
// console.log(textoMayor(valoresPregunta1));

/* RESPUESTA A PREGUNTA 2 */
const valoresPregunta2 = [true, 5, false, "hola", "adios",2];
const booleanos =  (valoresPregunta2) =>{
    for (let i=0; i < valoresPregunta2.length; i++){
        if (typeof valoresPregunta2[i] === 'boolean') {
            if (valoresPregunta2[i] === true) {
                console.log(valoresPregunta2[i]);
            } else {
                console.log(valoresPregunta2[i]);
            }
        }
    }
}
booleanos(valoresPregunta2);

/* RESPUESTA A PREGUNTA 3 */
const valoresPregunta3 = [true, 5, false, "hola", "adios",2];

const numero1 = valoresPregunta3[1];
const numero2 = valoresPregunta3[5];
//sumatoria
const sum = numero1 + numero2;
console.log(sum);
//resta
const rest = numero1 - numero2;
console.log(rest);
//division
const div = numero1 / numero2;
console.log(div);
//multiplicacion
const multi = numero1 * numero2;
console.log(multi);



function calculoFactor(number) {
    let valor = 1;
    for (let index = 1; index <= number; index++) {
        valor = valor * index;
    }
    console.log(valor);
}
calculoFactor(5);
calculoFactor(2);



function textoEntregado(texto) {
    let resultado = "";
    if (texto === texto.toLowerCase()) {
        resultado = 'La cadena entregada, esta formada solo por minusculas';
    }
    else if (texto === texto.toUpperCase()) {
        resultado = 'La cadena entregada, esta formada solo por mayusculas';
    }
    else {
        resultado = 'La cadena entregada, esta formada por minusculas y mayusculas';
    }
    return resultado;
}

const texto = "Juanito y Laura estan caminando por el parque.";
const resul = texto.replace('a',' ').replace('c',' ').replace('e',' ').replace('j',' ').replace('i',' ');
console.log(resul);



let nomina = [{}];
let trabajadoresNuevos = nomina.map((indice) => indice = [{1:"Sylvia","edad":40,"rol":"Developer"},{2:"Monica","edad":30,"rol":"Product Manager"},{3:"Alma","edad":32,"rol":"Product onwer"}]);
console.log(trabajadoresNuevos[0][Math.round(Math.random()*2)]);