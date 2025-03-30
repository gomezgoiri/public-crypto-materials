/*
 * Follow the CBC schema and implement encryption manually using "aesEnc" function
 * from utils and the pad function implemented in Exercise 3.
 *
 * Test that it returns the same content as Subtle Crypto.
 */

import { Buffer } from "node:buffer"
import { aesEnc } from "./utils.ts"

async function encryptAesCBC(
  iv: Uint8Array,
  key: CryptoKey,
  data: Buffer,
): Promise<Buffer> {
  const actualData = cbcPad(data)

  const ret = Buffer.alloc(actualData.byteLength)

  // Implementar siguiendo el esquema de las transparencias

  return ret
}

const iv = crypto.getRandomValues(new Uint8Array(16)) // 16-byte IV for AES-CBC
const key = null // get known or random key

const text =
  "Un mediodía en la terraza del bar Xampú, en la Gran Vía de Barcelona, está tomándose un vino blanco Mateu Seguí, un tipo humanista y sabio, también abogado especializado en el movimiento anarquista. Conoce al Rubio —a la persona y a su personaje— porque lo defendió un par de veces en los años setenta y ochenta."
const encoder = new TextEncoder()
const data = encoder.encode(text)

const customEncripted = await encryptAesCBC(
  new Uint8Array(iv),
  key,
  Buffer.from(data),
)

const encryptedData = await crypto.subtle.encrypt(
  { name: "AES-CBC", iv: iv },
  key,
  data,
)

const customArray = new Uint8Array(encryptedData)
for (let i = 0; i < customEncripted.length; i++) {
  if (customEncripted[i] !== customArray[i]) {
    throw new Error("¡La implementación de cifrado AES CBC no es correcta!")
  }
}

console.log("Implementación correcta")
