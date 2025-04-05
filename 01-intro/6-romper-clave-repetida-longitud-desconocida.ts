/*
 * Un mensaje ha sido cifrado con Vigenère usando una clave en inglés
 * de una longitud desconocida.
 *
 * Dicho mensaje se encuentra en el fichero "06.txt".
 *
 *  1. Implementar función hammingDistance(Buffer, Buffer) que devuelva un
 *     indicador de la semejanza entre dos conjuntos de bytes.
 *  2. Implementar scoreKeySize(number, Buffer): number
 *     Esta función recibirá un tamaño de clave y devolverá una medida de
 *     la similitud de trozos de CT de ese tamaño.
 *     Para ello dividirá CT en pares de trozos de longitud N cuya "hamming
 *     distance" calculará.
 *
 *     Nota: para hacer esta medida comparable tendréis que ponderar el
 *           tamaño de los cachos.
 *           Normalmente, dos buffers de tamaño 100 sumarán más bits que
 *           dos de 10.
 *     Nota 2: haced más de una comparación. Si se hacen distintos números
 *          de comparaciones, normalizad los resultados.
 *
 *  3. Calcular scoring para tamaños de clave de 2 a 100.
 *  4. Ordenar resultados de menos scoring (más similitud) a mayor.
 *  5. Seleccionar los 5 mejores tamaño de clave candidatos.
 *  6. Averiguar las claves más probables para cada uno de esos tamaños
 *     candidatos (podeis basaros en el código del ejercicio 5).
 *  7. Mostrarlos y permitir al usuario seleccionar la clave.
 *  8. Mostrar el mensaje descifrado con la clave seleccionada.
 */

import { Buffer } from "node:buffer"

/*
 * Métrica para conocer lo cerca o lejos que están dos bytes.
 *
 * "A" = 0x41  = 0100 0001
 * "S" = 0x53  = 0101 0011
 * "A" XOR "S" = 0001 0010
 *
 * hammingDistance("A", "S") = 2 (número de unos o bits distintos)
 * hammingDistance("a", "s") = 2
 * hammingDistance("a", "b") = 2
 * hammingDistance("a", "c") = 1
 * hammingDistance("a", "z") = 4
 * hammingDistance("A", "z") = 5
 * hammingDistance("A", "r") = 4
 * hammingDistance("A", "}") = 4
 * hammingDistance("AA", "}}") = 8
 * hammingDistance("Aa", "Sz") = 6
 * hammingDistance("Aaaa", "Szbc") = ?
 */
function hammingDistance(buff1: Buffer, buff2: Buffer): number {
}

/**
 * Esta función recibirá un tamaño de clave y devolverá una medida de
 * la similitud de trozos de CT de ese tamaño.
 *
 * Casos que podeis usar para comprobar si vuestra implementación es correcta:
 *    - candidateKeySize == 2:   1.5382978723404255
 *    - candidateKeySize == 5:   1.5755319148936173
 *    - candidateKeySize == 10:  1.5404255319148938
 *    - candidateKeySize == 45:  1.3944444444444444
 *    - candidateKeySize == 88:  1.5346590909090911
 */
function scoreKeySize(candidateKeySize: number, cipherText: Buffer): number {
  // Troceamos en cachos el doble de grande que el candidateKeySize para sacar
  // dos muestras por cada vuelta.
  const sliceSize = 2 * candidateKeySize

  let score = 0
  const numSlices = 1 // ¿Cuantos trozos de tamaño "sliceSize" hay en Buffer?

  for (let i = 0; i < numSlices; i++) {
    // Extraer un trozos de tamaño sliceSize de "cipherText" y dividirlo en 2.
    const slice1 = cipherText.subarray(0, 0)
    const slice2 = cipherText.subarray(0, 0)

    // Calculamos la hamming distance de los dos trozos
    const partialScore = hammingDistance(slice1, slice2)

    // Dos trozos de tamaño 5 tendrán potencialmente mas score que dos trozos
    // de tamaño 10 porque hacen comparaciones entre más caracteres.
    // Por ello, normalizamos partialScore para hacerlo independiente del
    // tamaño de los trozos.
    score = 0
  }

  // A  mayor "candidateKeySize", menos trozos podremos sacar del buffer
  // y por tanto, menor score acumulado potencialmente.
  // Necesitaremos normalizar la puntuación devuelta.
  // Para ello, uniformizaremos el score entre llamadas dividiendo la
  // puntuación total entre el número de trozos analizados.
  return 0
}

// Troceo como el del ejercicio 5.
// Si CT: 0a 0b 0c 0d 0e 0f 00 01 02 03 04
// Y keySize: 3
// Entonces debería devolver 3 Buffers:
//    - 0a 0d 00 03
//    - 0b 0e 01 04
//    - 0c 0f 02
function sliceVigenereCipherText(
  cipherText: Buffer,
  keySize: number,
): Buffer[] {
  return [Buffer.alloc(0)]
}

// Sacar mensaje cifrado de un fichero de texto.
const fileText = null
const cipherText = Buffer.from(fileText.replace("\n", ""), "base64")

const candidateSizes = []
for (let i = 2; i < 100; i++) {
  candidateSizes.push([i, scoreKeySize(i, cipherText)])
}

// Ordenamos de más a menos probables
candidateSizes.sort((a, b) => a[1] - b[1])

// Calculamos las claves probables para los 5 tamaños mas probables.
// Pista: podemos usar slice() para quedarnos con ellas.
// Para cada una, seguimos el proceso del ejercicio 5:
//   1. sliceVigenereCipherText
//   2. findMostLikelyKeyForLanguage para cada letra de la clave
//   3. Unimos las letras candidatas
const bestCandidateKeys = []

// Mostramos los mejores candidatas al usuario.
console.log("Mejores claves candidatas:\n")
bestCandidateKeys.forEach((key, i) => {
  console.log(
    `\t${i + 1}. "${key.toString()}" (size=${key.length})`,
  )
})
console.log()

// El usuario elige una de esas claves candidatas.
let choice
do {
  const answer = prompt("Selecciona la mejor candidata:")
  choice = Number(answer)
} while (isNaN(choice) || choice < 0 || bestCandidateKeys.length < choice)

const selectedKey = bestCandidateKeys[choice - 1]
console.group(`\nMensaje para clave ${selectedKey}:`)
console.log(decodeVigenere(cipherText, selectedKey).toString())
console.groupEnd()
