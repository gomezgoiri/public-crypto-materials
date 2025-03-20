/*
 * Descifrar el siguiente mensaje para el que se ha usado un único byte para cifrarlo (ver función "encode"):
 *   fcddcbdcdd98ffd1cad7d6d998d0d9cbccd998f5cdcadbd1d99498c198dcddcbdcdd98f0cdddcbdbd998d0d9cbccd998f2d97b11d69498ddd6dbd7d6cccad9d5d7cb98d9caccdd98dbcddacad1ddd6dcd798dbd1ddd6ccd7cb98dcdd98dbcdddced9cb98c198d9dacad1dfd7cb98cad7dbd7cbd7cb96
 *
 * El mensaje será un texto escrito, por lo que la mayoría de bytes deberían ser de este tipo: https://www.ascii-code.com/characters/printable-characters
 * Ojo, el mensaje puede contener acentos y por lo tanto estará codificado en UTF-8, no en ASCII.
 */

import { Buffer } from "node:buffer"

function findLikelyKey(cipheredText: Buffer): number {
  let mostPrintableChars = -1
  let bestCandidate = -1

  for (let i = 0; i < 255; i++) {
    let countPrintableChars = 0
    for (let j = 0; j < cipheredText.length; j++) {
      const deciphered = i ^ cipheredText[j]
      if (deciphered >= 0x61 && deciphered <= 0x7a) { // Minusculas
        // Le damos más peso a estos caracteres que son más comunes
        countPrintableChars += 10
      } else if (deciphered >= 0x41 && deciphered <= 0x5e) { // Mayusculas
        countPrintableChars += 1
      }
      // No contamos el resto de los caractéres,
      // aunque también podriamos comprobar y ponderar otros como signos de puntuación.
    }
    if (countPrintableChars > mostPrintableChars) {
      mostPrintableChars = countPrintableChars
      bestCandidate = i
    }
  }

  return bestCandidate
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
