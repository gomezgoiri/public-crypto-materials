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

function scoreKeySize(candidateKeySize: number, cipherText: Buffer): number {
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

// Mostramos los mejores candidatos y elegimos uno
const bestCandidateKeys = []

console.log("Mejores claves candidatas:\n")
bestCandidateKeys.slice(0, 5).forEach((key, i) => {
  console.log(
    `\t${i + 1}. "${key.toString()}" (size=${key.length})`,
  )
})
console.log()

let choice
do {
  const answer = prompt("Selecciona la mejor candidata:")
  choice = Number(answer)
} while (isNaN(choice) || choice < 0 || bestCandidateKeys.length < choice)

const selectedKey = bestCandidateKeys[choice - 1]
console.group(`\nMensaje para clave ${selectedKey}:`)
console.log(decodeVigenere(cipherText, selectedKey).toString())
console.groupEnd()
