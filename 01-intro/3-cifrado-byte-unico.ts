/*
 * Descifrar el siguiente mensaje para el que se ha usado un único byte para cifrarlo (ver función "encode"):
 *   fcddcbdcdd98ffd1cad7d6d998d0d9cbccd998f5cdcadbd1d99498c198dcddcbdcdd98f0cdddcbdbd998d0d9cbccd998f2d97b11d69498ddd6dbd7d6cccad9d5d7cb98d9caccdd98dbcddacad1ddd6dcd798dbd1ddd6ccd7cb98dcdd98dbcdddced9cb98c198d9dacad1dfd7cb98cad7dbd7cbd7cb96
 *
 * El mensaje será un texto escrito, por lo que la mayoría de bytes deberían ser de este tipo: https://www.ascii-code.com/characters/printable-characters
 * Ojo, el mensaje puede contener acentos y por lo tanto estará codificado en UTF-8, no en ASCII.
 */

import { Buffer } from "node:buffer"
import { randomBytes } from "node:crypto"

function findLikelyKey(cipheredText: Buffer): number {
  return 0
}

const ct = Buffer.from(
  "fcddcbdcdd98ffd1cad7d6d998d0d9cbccd998f5cdcadbd1d99498c198dcddcbdcdd98f0cdddcbdbd998d0d9cbccd998f2d97b11d69498ddd6dbd7d6cccad9d5d7cb98d9caccdd98dbcddacad1ddd6dcd798dbd1ddd6ccd7cb98dcdd98dbcdddced9cb98c198d9dacad1dfd7cb98cad7dbd7cbd7cb96",
  "hex",
)

const key = findLikelyKey(ct)
console.log("Likely key:", key)
console.group("Message:")
const pt = ct.map((b) => b ^ key) // Decode
console.log(Buffer.from(pt.buffer).toString("utf-8"))
console.groupEnd()
