/**
 * En este ejercicio, buscaremos una colisión en una función hash debil.
 *
 * Para ello truncaremos lo que nos devuelva SHA-1 para quedarnos sólo con sus N bits iniciales.
 *
 * Probad cuantos intentos necesitamos para 8 a 20 bits.
 */

import { Buffer } from "node:buffer"

const encoder = new TextEncoder()

async function hashInseguro(data: Uint8Array, numBits = 8) {
  const hash = await crypto.subtle.digest("SHA-1", data)
  const numBytes = Math.ceil(numBits / 8)

  const ret: Uint8Array = Buffer.from(hash).subarray(0, numBytes)

  const bitsInLastByte = numBits % 8
  if (bitsInLastByte > 0) {
    // Truncate last byte bit adding zeroes
    const lastByte = ret[ret.length - 1]
    // 1111 1111, 1111 1110, 1111 1100, 1111 1000,...
    const mask = (0xff >> bitsInLastByte) ^ 0xff
    ret[ret.length - 1] = lastByte & mask
  }
  return ret
}

const texto = "password in database"
const data = encoder.encode(texto)

for (let numBits = 8; numBits <= 20; numBits++) {
  const hash = await hashInseguro(data, numBits)
  console.log(
    `Hash inseguro (${numBits} bits) del texto dado:`,
    Buffer.from(hash).toString("hex"),
  )

  let i = 1
  let collision: Uint8Array = new Uint8Array(0)

  // Buscar colisiones y contar número de intentos necesitados:

  console.log(
    `\tColisión encontrada (en ${i} intentos):`.padEnd(50),
    `'${Buffer.from(collision).toString("ascii")}'`,
  )
}
