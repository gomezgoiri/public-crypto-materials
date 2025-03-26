/*
 * Sabemos que Alice ha enviado un mensaje a Bob.
 *
 * Sin usar la clave que Alice y Bob comparten,
 * modificar CT para cambiar el receptor de "Bob" a "Eve".
 *
 * Asumid que existe un formato de mensajes que conocemos:
 *    { "from": "<name>", "to": "<name>", message: "<lo que sea>" }
 */

import { randomBytes } from "node:crypto"
import { Buffer } from "node:buffer"

function createMessage(from: string, to: string, content: string): string {
  return `{ "from": "${from}", "to": "${to}", "message": "${content}" }`
}

function encrypt(buff: Buffer, key: Buffer): Buffer {
  return Buffer.from(buff.map((b, i) => b ^ key[i]))
}

const decrypt = encrypt

function modifyReceiverInCT(ct: Buffer): Buffer {
  // Quiero dejar el resto de bytes igual y alterar los de "Bob" por "Eve"
  const mask = Buffer.alloc(ct.length)

  // Generar mascara que modifique sólo los bytes correspondientes a "Bob" con un XOR:
  // 0x000000..."Bob"[i] xor "Eve"[i]...000000

  // Aplicamos la mascara sobre el CT original:
  const ret = Buffer.from(ct.map((b, i) => b ^ mask[i]))

  console.log("Original CT:".padEnd(16), ct.toString("hex"))
  console.log("Mask:".padEnd(16), mask.toString("hex"))
  console.log("Modified CT:".padEnd(16), ret.toString("hex"))

  return ret
}

const key = randomBytes(1024) // 1KB

const plainText = Buffer.from(
  createMessage("Alice", "Bob", "I send 2 euros to the receiver"),
  "utf8",
)

const cipherText = encrypt(plainText, key)
const modifiedCT = modifyReceiverInCT(cipherText)

console.log()
console.group("Modified plaintext:")
console.log(decrypt(modifiedCT, key).toString("utf8"))
console.groupEnd()
