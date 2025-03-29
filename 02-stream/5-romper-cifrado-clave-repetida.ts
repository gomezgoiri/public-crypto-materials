/*
 * Vamos a comprobar qué ocurre cuando usamos la misma clave de cifrado más de una vez con stream cipher y OTP.
 * En el fichero "ciphertexts.txt" encontraras codificados con la misma clave una serie de mensajes (en hexadecimal).
 * Tu objetivo es descrifrar el contenido de "secret.txt".
 *
 * Ayuda: al hacer un XOR de los mensajes cifrados, piensa qué pasa cuando haces un XOR entre un espacio y cualquier carácter en [a-zA-Z].
 *
 * Espacio: 0x20
 * "a": 0x61
 * "z": 0x7a
 * "A": 0x41
 * "Z": 0x5a
 * "a" xor espacio = "A"
 * "A" xor espacio = "a"
 * "z" xor espacio = "Z"
 * "Z" xor espacio = "z"
 */

import { Buffer } from "node:buffer"

function decodeCT(cipherText: Buffer, key: Buffer): Buffer {
  const plainText = Buffer.alloc(cipherText.length)
  for (let i = 0; i < plainText.length; i++) {
    plainText[i] = key[i] ^ cipherText[i]

    // If non displayable character => put a question mark instead
    if (plainText[i] < 0x20 || plainText[i] > 0x7e) {
      plainText[i] = 0x3f // === "?".charCodeAt(0).toString(16)
    }
  }
  return plainText
}

function isProbablyXorOfSpace(xorByte: number): boolean {
  const isaz = xorByte >= 0x61 && xorByte <= 0x7a // <space> xor AZ
  const isAZ = xorByte >= 0x41 && xorByte <= 0x5a // <space> xor az
  const isSpace = xorByte === 0x0
  const isDot = xorByte === (0x20 ^ ".".charCodeAt(0))
  const isComma = xorByte === (0x20 ^ ",".charCodeAt(0))

  return isaz || isAZ || isSpace || isDot || isComma
}

function scoreCharLikeliness(char: number) {
  if (char >= 0x61 && char <= 0x7a) { // [a-z]
    return 1.5
  } else if (char >= 0x41 && char <= 0x5a) { // [A-Z]: slightly less common
    return 1.2
  } else if (char >= 0x20 && char <= 0x59) { // least common printable chars
    return 0.8
  }
  return 0
}

function getMostLikelyKeyChar(
  possibleKeys: number[],
  cipherChars: number[],
): number {
  if (possibleKeys.length === 1) {
    return possibleKeys[0]
  } else if (possibleKeys.length > 1) {
    // Puntua todas las claves posibles usando scoreCharLikeliness()
    // Coge aquella con mayor puntuación y devuelvela.
    // Si hay un empate entre alguna de las opciones, devuelve la que se repita más.
    return 0x0
  } else {
    return 0x0 // Default return
  }
}

async function main() {
  const ciphertexts: string[] = [] // Leer de "5-romper-cifrado-clave-repetida/ciphertexts.txt"
  const toDecipher = "" // Leer de "5-romper-cifrado-clave-repetida/secret.txt"
  const allCT = [toDecipher, ...ciphertexts] // Concatena todos los buffers de los mensajes cifrados

  // Los mensajes pueden tener longitudes distintas, cogemos la mayor de ellas.
  const maxLength = Math.max(...ciphertexts.map((d) => d.length))
  const decipheredKey = Buffer.alloc(maxLength)

  // Para cada elemento de la clave a descifrar...
  for (let k = 0; k < decipheredKey.length; k++) {
    const possibleKeys: Array<number> = []

    // Probamos para cada mensaje...
    for (let i = 0; i < allCT.length && possibleKeys[k] === undefined; i++) {
      if (k < allCT[i].length) {
        // Verificamos si el XOR de dos palabras es posiblemente el XOR de dos mensajes printables.
        let allProbablyPrintable = true
        // Para obviar los casos en los que solo haya un único elemento a comparar.
        // Esto pasará en los últimos caracteres del mensaje más largo.
        let atLeastTwoCompared = false

        // ...a hacer XOR con cada uno de los otros mensajes.
        for (let j = 0; j < allCT.length && allProbablyPrintable; j++) {
          if (k < allCT[j].length && j !== i) {
            // XOR entre los distintos CTs, las clave se anularán entre si
            // y nos quedaremos con XORs entre los PTs
            const xor = 0

            // Le aplicamos isProbablyXorOfSpace() para saber:
            // ¿El XOR del byte del mensaje a probar con el resto de mensajes (los bytes en esa misma posición)
            //  devuelve un caracter visible? Si es así, será posiblemente un espacio (0x20).
            // Y si sabemos el valor de un byte cifrado y descifrado (PT y CT), ¡podemos inferir el valor de la clave en ese byte!

            atLeastTwoCompared = true
          }
        }

        if (allProbablyPrintable && atLeastTwoCompared) {
          // Como puede haber más de un byte de distintos mensajes que cumpla esa condición...
          // Añadir a possibleKeys
        }
      }
    }

    // Llamamos a esta función para quedarnos con la clave maś probable.
    decipheredKey[k] = getMostLikelyKeyChar(
      possibleKeys,
      allCT.map((c) => c[k]),
    )
  }

  console.log("Guessed key:", decipheredKey.toString("hex"), "\n")

  ciphertexts.forEach((ct, i) => {
    console.log(
      `PT ${i}:`,
      decodeCT(ct, decipheredKey).toString(
        "ascii",
      ),
    )
  })

  console.log(
    "\n\nSecret message:",
    decodeCT(toDecipher, decipheredKey).toString(
      "ascii",
    ),
  )
}

await main()
