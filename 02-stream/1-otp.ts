/*
 * Cread contraseña de un solo uso aleatoriamente y aplicarla para cifrar y descifrar un mensaje.
 */

import { randomBytes } from "node:crypto"
import { Buffer } from "node:buffer"

const plainText = Buffer.from(
  "Y este arte ha traído mucha cola, en parte porque los códigos con los que se representan estas escenas no son a los que estamos acostumbrados. Si buscas algunas de ellas en Google y, tras ver lo que parecen unos monigotes, lees la interpretación que han dado los arqueólogos, probablemente se te escape un «pos será verdad...». Hace falta mucha experiencia para leer estas figuras, y, aun así, no siempre están muy claras. Pero realmente estas interpretaciones y estos debates son importantes. Porque cómo representamos la figura humana dice mucho de cómo nos vemos a nosotros mismos y de cómo vemos el orden social.",
  "utf8",
)

const key = null // Cread clave de 1KB
const cipherText = encrypt(plainText, key)

console.log("Encrypted:", cipherText.toString("hex"))
console.log()
console.log("Decrypted:", decrypt(cipherText, key).toString("utf8"))
