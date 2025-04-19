/*
 * Ejercicio para evaluación individual: implementad el esquema CBC-MAC.
 *
 * Después, usadlo con un algoritmo de cifrado para implementar vuestro propio mecanismo de cifrado autenticado.
 *
 * Casos a probar:
 *    - Caso 1: Alice cifra un mensaje y se lo entrega a Bob, este lo descifra.
 *    - Caso 2: Alice cifra un mensaje y se lo envía a Bob. Mallory lo intercepta (man-in-the-middle), modifica el primer byte y se lo reenvía a Bob.
 */

import { Buffer } from "node:buffer"
import { aesEnc, cbcPad } from "../03-block/utils.ts"

async function cbcMac(
  key: CryptoKey,
  key1: CryptoKey,
  data: Buffer,
): Promise<Uint8Array> {
  return new Uint8Array()
}

async function authEnc(
  macKey1: CryptoKey,
  macKey2: CryptoKey,
  encryptionKey: CryptoKey,
  iv: Uint8Array,
  data: Buffer,
): Promise<Buffer> {
  return Buffer.alloc(1)
}

async function authDec(
  macKey1: CryptoKey,
  macKey2: CryptoKey,
  decryptionKey: CryptoKey,
  iv: Uint8Array,
  data: Buffer,
): Promise<Buffer> {
  return Buffer.alloc(1)
}

const iv = crypto.getRandomValues(new Uint8Array(16)) // 16-byte IV for AES-CBC

const authKey1 = await crypto.subtle.generateKey(
  { name: "AES-CBC", length: 256 },
  false,
  ["encrypt"],
)

const authKey2 = await crypto.subtle.generateKey(
  { name: "AES-CBC", length: 256 },
  false,
  ["encrypt"],
)

const encDecKey = await crypto.subtle.generateKey(
  { name: "AES-CTR", length: 256 },
  false,
  ["encrypt", "decrypt"],
)

const pt = Buffer.from(
  "In comparison with the control group, both the multicultural training and ACT groups had reduced stigmatizing attitudes toward clients immediately after the workshop.",
  "utf8",
)

// const tag = await cbcMac(authKey1, authKey2, pt)

const ct = await authEnc(authKey1, authKey2, encDecKey, iv, pt)
const decrypted = await authDec(authKey1, authKey2, encDecKey, iv, ct)

console.log("Decrypted:", decrypted.toString("utf8"))

// Altered by Mallory: it adds 1 to each byte
const alteredCT = Buffer.from(ct.map((v) => v + 1))

// Should return error!
await authDec(authKey1, authKey2, encDecKey, iv, alteredCT)
