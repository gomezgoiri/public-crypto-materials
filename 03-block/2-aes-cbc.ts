/*
 * Cifrad y descifrad un mensaje usando el modo CBC de AES y la librería Subtle Crypto.
 */

import { Buffer } from "node:buffer"

const text = "Hello, Deno 2!"
const encoder = new TextEncoder()
const data = encoder.encode(text)

// Crear clave: tenéis dos opciones: partir de una conocida o crear una al azar.
// Probad ambas mirando la documentación en SubtleCrypto.
const key = null

// Generar un IV de 16 bits (un bloque)
const iv = null

const encryptedData = await crypto.subtle.encrypt()

console.log("Encrypted Data:", Buffer.from(encryptedData).toString("hex"))

const decryptedData = await crypto.subtle.decrypt()

const decryptedText = new TextDecoder().decode(decryptedData)
console.log("Decrypted Text:", decryptedText)
