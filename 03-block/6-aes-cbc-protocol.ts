/*
 * Simulad un protocolo de comunicación entre dos partes usando la construcción descrita anteriormente.​
 *   - El nonce se añade al principio del primer mensaje.​
 *   - A partir de ese punto, se incremente en cada nuevo mensaje (tanto en el emisor como en el receptor)
 */

import { Buffer } from "node:buffer"
import { aesEnc, toBuffer } from "./utils.ts"

async function encrypt(
  nonce: bigint,
  k1: CryptoKey,
  k: CryptoKey,
  data: Buffer,
): Promise<Uint8Array> {
}

async function decrypt(
  nonce: bigint,
  k1: CryptoKey,
  k: CryptoKey,
  data: Buffer,
): Promise<Uint8Array> {
}

const k = // Crear clave aleatoria para AES-CBC

const k1 = // Crear clave aleatoria para AES-CBC

const bunchOfMessages = [
  "message one",
  "message two",
  "message three",
  "Hi there! I'm Alice and this is a very large message encrypted using CBC. I am sending it to you, Bob.",
  "Final message... for now.",
]

// Código del emisor
const messagesToSend = []
let nonce = 0n
for (const m of bunchOfMessages) {
  const ct = await encrypt(nonce, k1, k, Buffer.from(m, "utf8"))

  if (nonce === 0n) {
    // Añadimos nonce al primer mensaje a intercambiar
    // Actualizamos messageToSend
  } else {
    // Actualizamos messageToSend
  }
  nonce += 1n
}

console.log("Messages sent", messagesToSend.map((m) => m.toString("hex")))

// Código del receptor
let firstMessage = true
const decryptedMsgs = []
for (const m of messagesToSend) {
  let dataToDecrypt: Buffer

  if (firstMessage) {
    firstMessage = false

    // Dividid usando la función subarray
    // Cogemos nonce del primer bloque
    nonce = null // Truco: guardar en bigint usando BigInt(0xff)
    dataToDecrypt = null
  } else {
    // Actualizar nonce
    // Almacenamos los datos a descifrar
    dataToDecrypt = null
  }

  decryptedMsgs.push(await decrypt(nonce, k1, k, dataToDecrypt))
}

console.log(
  "Messages received",
  decryptedMsgs.map((m) => Buffer.from(m).toString("utf8")),
)
