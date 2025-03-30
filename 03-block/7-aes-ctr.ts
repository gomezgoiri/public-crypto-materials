/*
 * Cifrad y descifrad un mensaje usando el modo CTR de AES y la librería Subtle Crypto.
 */

import { Buffer } from "node:buffer"

const iv = crypto.getRandomValues(new Uint8Array(16))
const key = await crypto.subtle.generateKey(
  { name: "AES-CTR", length: 256 },
  true,
  ["encrypt", "decrypt"],
)
const plainText =
  "Cuando la noción de la responsabilidad personal por el destino propio es demasiado contundente, se vuelve difícil imaginarnos en la piel de otras personas."

// Llamando a Subtle Crypto
const cipherText = null

console.log("Encrypted Data:", Buffer.from(cipherText).toString("hex"))

// Llamando a Subtle Crypto
const decrypted = null

console.log(
  "Decrypted Data:",
  new TextDecoder().decode(decrypted),
)
