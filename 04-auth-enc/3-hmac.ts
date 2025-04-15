/*
 * Implementad HMAC usando SHA-256.
 *
 * Haced una variante para cualquiera de los algoritmos permitidos en Subtle Crypto.
 */

import { Buffer } from "node:buffer"
import { randomBytes } from "node:crypto"

const ALGORITHM = "SHA-256"
const BLOCK_SIZE = 512 / 8

async function hmac(key: Buffer, data: Uint8Array) {
  const actualKey = Buffer.alloc(BLOCK_SIZE)
  if (key.length <= BLOCK_SIZE) {
    // Las claves menores que el tamaño del bloque del hash, se rellenan con ceros a la derecha
  } else {
    // RFC 2104: Para claves más largas que el tamaño del bloque del hash, se usa el hash de la clave.
    // Wikipedia: This property is sometimes raised as a possible weakness of HMAC in
    // password-hashing scenarios: it has been demonstrated that it's possible to find
    // a long ASCII string and a random value whose hash will be also an ASCII string,
    // and both values will produce the same HMAC output.
  }

  const iKeyPad = new Uint8Array()
  const oKeyPad = new Uint8Array()

  // First pass
  // Second pass

  return new Uint8Array()
}

const encoder = new TextEncoder()
const texto =
  "La situación me resultó molesta, porque tuve la impresión de que yo también debía decir algo. Pero todo había acontecido con tanta rapidez que no se me ocurrió nada sensato."
const inData = encoder.encode(texto)

// Nota: Subtle Crypto funcionará igual a nuestra implementación sólo para claves menores o iguales al tamaño del bloque.
const key = randomBytes(12)
const hash = Buffer.from(await hmac(key, inData))
console.log(`HMAC ${ALGORITHM}:`.padEnd(28), hash.toString("hex"))

// Para verificar nuestra función, usaremos Subtle Crypto.
const subtleAlgo = { name: "HMAC", hash: ALGORITHM }
const subtleKey2 = await crypto.subtle.importKey("raw", key, subtleAlgo, true, [
  "sign",
])
const subtleSignature = Buffer.from(
  await crypto.subtle.sign(subtleAlgo, subtleKey2, inData),
)

if (!subtleSignature.every((b, i) => b === hash[i])) {
  throw new Error(
    "Unexpected HMAC. Expecting: " + subtleSignature.toString("hex"),
  )
} else {
  console.log(
    `HMAC ${ALGORITHM} Subtle Crypto:`.padEnd(28),
    subtleSignature.toString("hex"),
  )
}
