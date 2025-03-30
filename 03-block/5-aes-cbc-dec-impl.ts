/*
 * Follow the CBC schema and implement decryption manually using "aesDec" function
 * from utils and the unpad function implemented in Exercise 3.
 *
 * Test that it can retrieve the original message.
 */

import { Buffer } from "node:buffer"
import { aesDec } from "./utils.ts"

async function decryptAesCBC(
  iv: Uint8Array,
  key: CryptoKey,
  data: Buffer,
): Promise<Buffer> {
  let ret = Buffer.alloc(data.length)

  // Implementar siguiendo el esquema

  return ret
}

const iv = crypto.getRandomValues(new Uint8Array(16)) // 16-byte IV for AES-CBC
const key = null // conocida o aleatoria

const text =
  "Un mediodía en la terraza del bar Xampú, en la Gran Vía de Barcelona, está tomándose un vino blanco Mateu Seguí, un tipo humanista y sabio, también abogado especializado en el movimiento anarquista. Conoce al Rubio —a la persona y a su personaje— porque lo defendió un par de veces en los años setenta y ochenta."
const encoder = new TextEncoder()
const data = encoder.encode(text)

const ct = await crypto.subtle.encrypt(
  { name: "AES-CBC", iv: iv },
  key,
  data,
)

// Descifrar usando vuestra implementación CBC
const customDecrypted = await decryptAesCBC(
  new Uint8Array(iv),
  key,
  Buffer.from(ct),
)

// Descifrar usando Subtle Crypto para comprobar la validez de nuestra implementación
const decryptedData = await crypto.subtle.decrypt(
  { name: "AES-CBC", iv: iv },
  key,
  ct,
)

const ptHexWithSubtleHex = Buffer.from(decryptedData).toString("hex")
const ptHexWithCustom = customDecrypted.toString("hex")

if (ptHexWithSubtleHex !== ptHexWithCustom) {
  throw new Error("¡La implementación de descifrado AES CBC no es correcta!")
} else {
  const customDecryptedText = customDecrypted.toString("utf8")
  console.log(`Secret message: "${customDecryptedText}"`)
}
