/*
 * Implementad vuestra propia versión de AES CTR (dec y enc) y comprobad que funciona.
 */

import { Buffer } from "node:buffer"
import { toBigInt, toBuffer } from "./utils.ts"

const nullIv = Buffer.alloc(16)
const NUMBER_OF_COUNTER_BYTES = 8

async function aesCTRBlockCipher(
  key: CryptoKey,
  nonce: bigint,
  counter: bigint,
  counterLength: number = NUMBER_OF_COUNTER_BYTES, // Suggested by NIST SP800-38A
) {
  // Construir IV usando nonce, counter y counterLength
  const iv = new Uint8Array(16)

  return new Uint8Array(
    await crypto.subtle.encrypt(
      {
        name: "AES-CTR",
        counter: iv,
        length: counterLength * 8,
      },
      key,
      nullIv,
    ),
  )
}

async function encDecAesCTR(
  nonce: bigint,
  key: CryptoKey,
  data: Buffer,
): Promise<Buffer> {
  const ret = Buffer.alloc(data.byteLength)

  // Id bloque por bloque cifrandolo/descifrandolo
  // o hacedlo en paralelo con await Promise.all()

  return ret
}

//// Este trozo de código iría en el emisor ////

// En el txt tenemos distintas líneas que cifraremos y enviaremos
// en un mensaje distinto al receptor
const plainTexts = Deno.readTextFileSync("./8-aes-ctr-impl/plainTexts.txt")
  .split("\n").map((t) => Buffer.from(t, "utf8"))

const key = await crypto.subtle.generateKey(
  { name: "AES-CTR", length: 256 },
  true,
  ["encrypt", "decrypt"],
)

// Calculamos un nonce aleatorio para empezar, este lo podemos incluir
let nonce = 0n

// Variable que habría que transmitir al receptor,
// representa el contenido de los distintos mensajes.
const cipherTexts = []
let firstAppended = false

for (const pt of plainTexts) {
  const myCT = await encDecAesCTR(nonce, key, pt)

  const nonceBuffer = new Uint8Array(16)
  toBuffer(nonce, NUMBER_OF_COUNTER_BYTES).copy(nonceBuffer)

  const ctrConfig = {
    name: "AES-CTR",
    counter: nonceBuffer,
    length: NUMBER_OF_COUNTER_BYTES * 8,
  }
  const subtleCryptoCT = await crypto.subtle.encrypt(ctrConfig, key, pt)
  const expectedHex = Buffer.from(subtleCryptoCT).toString("hex")

  if (myCT.toString("hex") !== expectedHex) {
    throw new Error("¡La implementación de cifrado AES CTR no es correcta!")
  }

  if (!firstAppended) {
    // Al primer mensaje le añadimos el nonce al principio
    // para que el receptor lo conozca.
    cipherTexts.push()
    firstAppended = true
  } else {
    cipherTexts.push(myCT)
  }

  nonce += 1n
}

// Este trozo de código que iría en el receptor
// Asumimos que cipherText ha sido transmitido usando el protocolo que sea.

let firstMessage = true
nonce = 0n

for (const ct of cipherTexts) {
  // Buffer que tendrá la parte que no es el nonce del primer mensaje
  // y todo el contenido en el resto de mensajes
  let ctBlock: Buffer

  if (firstMessage) {
    // El receptor extrae el nonce del primer mensaje
    firstMessage = false
  } else {
    // Actualizar nonce
  }

  const myPT = await encDecAesCTR(nonce, key, ctBlock)
  console.log("Texto descrifrado:", myPT.toString("utf8"))
}
