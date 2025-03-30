/*
 * El fichero "1-detectar-aes-ecb/ciphertexts.txt" contiene mensajes cifrados usando distintos modos de AES.
 *
 * Muchos de estos mensajes contienen al menos un bloque igual al de otros mensajes.
 *
 * Detectad cuales de ellos fueron cifrados usando el modo (inseguro) ECB.
 */

import { Buffer } from "node:buffer"

const BLOCK_SIZE = 16

type ArrayDeBloques = Array<Buffer<ArrayBuffer>>

async function readCipherTexts(
  filename: string,
): Promise<Array<Buffer<ArrayBuffer>>> {
}

function toArrayOfBlocks(ct: Buffer<ArrayBuffer>): ArrayDeBloques {
}

const ciphertexts = await readCipherTexts("1-detectar-aes-ecb/ciphertexts.txt")
const ciphertextsInBlocks = ciphertexts.map(toArrayOfBlocks)

// Para cada par de CTs, id comprobando si cada bloque de un CT coincide
// con algún bloque del otro CT.+
