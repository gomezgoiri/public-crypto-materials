/*
 * El fichero "1-detectar-aes-ecb/ciphertexts.txt" contiene mensajes cifrados usando distintos modos de AES.
 *
 * Muchos de estos mensajes contienen al menos un bloque igual al de otros mensajes.
 *
 * Detectad cuales de ellos fueron cifrados usando el modo (inseguro) ECB.
 */

import { Buffer } from "node:buffer"

const BLOCK_SIZE = 16

async function readCipherTexts(
  filename: string,
): Promise<Array<Buffer<ArrayBuffer>>> {
}

const equalBlock = (
  data: Buffer,
  data2: Buffer,
  startsAt: number,
  startsAt2: number,
) => {
  for (let i = 0; i < BLOCK_SIZE; i++) {
    if (data[startsAt + i] !== data2[startsAt2 + i]) {
      return false
    }
  }
  return true
}

const ciphertexts = await readCipherTexts("1-detectar-aes-ecb/ciphertexts.txt")

// Para cada bloque en cada CT:
//   1. Comprobar si otro bloque del mismo CT es igual
//   2. Para el resto de CTs, comprobar si tienen algún bloque que sea igual
// Mostrar por consola qué bloques de qué CTs son iguales.
