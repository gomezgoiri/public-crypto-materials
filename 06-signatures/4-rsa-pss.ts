/*
 * Implementad RSA PSS.
 *
 * Función de hash: SHA1
 * Función de generación de máscara: mgf1SHA1
 * Tamaño de la salt: 20 bytes
 * Trailer field: 0xbc
 */

import { Buffer } from "node:buffer"
import { powermod, toNumber } from "./utils.ts"
import { randomBytes } from "node:crypto"

const KEY_LENGTH = 2048
const HASH_LENGTH = 20 // SHA-1 has 160 bits
const SALT_LENGTH = 20
const TRAILER_FIELD = 0xbc

// maximal bit length, at least 8hLen + 8sLen + 9
const EM_BITS = 8 * HASH_LENGTH + 8 * SALT_LENGTH + 9

async function mgf1SHA1(
  seed: Uint8Array,
  maskLength: number,
): Promise<Uint8Array> {
  const ret = new Uint8Array(maskLength)

  const hLen = 20 // 160 bits, the size of hashes in SHA-1
  for (let i = 0; i < Math.ceil(maskLength / hLen); i++) {
    // Convert counter to 4-byte big-endian
    const counter = new Uint8Array([
      (i >>> 24) & 0xff,
      (i >>> 16) & 0xff,
      (i >>> 8) & 0xff,
      i & 0xff,
    ])

    // Concatenate seed and counter
    const data = new Uint8Array(seed.length + 4)
    data.set(seed)
    data.set(counter, seed.length)

    // Hash the data using SHA-1
    const hashBuffer = await crypto.subtle.digest("SHA-1", data)
    const hash = new Uint8Array(hashBuffer)

    // Copy to result
    const offset = i * hLen
    ret.set(
      hash.slice(0, Math.min(hash.length, maskLength - offset)),
      offset,
    )
  }

  return ret
}

// https://datatracker.ietf.org/doc/html/rfc3447#section-9.1.1
async function encodeEmsaPss(
  message: Buffer,
  proposedSalt?: Buffer,
): Promise<Buffer> {
  // emLen = ceil(emBits/8)
  const emLen = Math.ceil(EM_BITS / 8)

  const sha1Limit = (2n ** 61n) - 1n
  if (message.length > sha1Limit) {
    throw new Error("Message too long")
  }

  // mHash <- hash(m)
  const mHash = null

  // Genera salt aleatorio de sLen si salt es undefined
  const salt = null

  if (emLen < mHash.byteLength + salt.byteLength + 1) {
    throw new Error("Encoding error")
  }

  // m2 <- 0x00..0000 (8 bytes de ceros) || mHash || salt
  // h <- hash(m2)

  // db es un buffer de tamaño: emLen - hLen - 1
  // db <- 00...0 || 0x01 || salt
  // dbMask <- mgf1SHA1(h2, db.length)
  // maskedDB <- db xor dbMask

  // Pone los bitsWhichMustBeZero primeros bits del primer byte
  // empezando por la izquierda a cero
  const bitsWhichMustBeZero = (8 * emLen) - EM_BITS
  const zeroMask = 0xff >> bitsWhichMustBeZero
  // maskedDB[0] <- maskedDB[0] & zeroMask

  // em <- maskedDB || h || 0xbc

  return
}

// https://datatracker.ietf.org/doc/html/rfc3447#section-9.1.2
async function verifyEmsaPss(
  message: Buffer,
  emNumber: bigint,
): Promise<boolean> {
  const emLen = Math.ceil(EM_BITS / 8)
  const emNumberHex = emNumber.toString(16)
  // Si metes un hex impar a Buffer.from(), ignorará el último y aparecerán desplazados
  const emNumberEvenHex = emNumberHex.length % 2 === 0
    ? emNumberHex
    : "0" + emNumberHex
  const tempEm = Buffer.from(emNumberEvenHex, "hex")
  const em = Buffer.alloc(emLen)
  tempEm.copy(em, em.length - tempEm.length)

  // 1. If the length of M is greater than the input limitation for the
  // hash function (2^61 - 1 octets for SHA-1), output "inconsistent"
  // and stop.
  if (message.length > SHA1_LIMIT) {
    return false
  }

  // 2. Let mHash = Hash(M), an octet string of length hLen.
  const mHash = Buffer.from(await crypto.subtle.digest("SHA-1", message))

  // 3. If emLen < hLen + sLen + 2, output "inconsistent" and stop.
  if (emLen < HASH_LENGTH + SALT_LENGTH + 2) {
    return false
  }

  // 4. If the rightmost octet of EM does not have hexadecimal value
  // 0xbc, output "inconsistent" and stop.
  if (em[em.length - 1] !== TRAILER_FIELD) {
    return false
  }

  // 5. Let maskedDB be the leftmost emLen - hLen - 1 octets of EM, and
  // let H be the next hLen octets.
  const maskedDB = em.subarray(0, emLen - HASH_LENGTH - 1)
  const h = em.subarray(emLen - HASH_LENGTH - 1, emLen - 1)

  // 6. If the leftmost 8emLen - emBits bits of the leftmost octet in
  // maskedDB are not all equal to zero, output "inconsistent" and stop.
  const bitsWhichMustBeZero = (8 * emLen) - EM_BITS
  const oneMask = 0xff & (0xff << (8 - bitsWhichMustBeZero))
  if ((maskedDB[0] & oneMask) !== 0) {
    return false
  }

  // 7. Let dbMask = MGF(H, emLen - hLen - 1).
  const dbMask = await mgf1SHA1(h, emLen - HASH_LENGTH - 1)

  // 8. Let DB = maskedDB xor dbMask.
  const db = Buffer.alloc(maskedDB.byteLength)
  for (let i = 0; i < db.byteLength; i++) {
    db[i] = maskedDB[i] ^ dbMask[i]
  }

  // 9. Set the leftmost 8emLen - emBits bits of the leftmost octet in DB
  // to zero.
  const zeroMask = 0xff >> bitsWhichMustBeZero
  db[0] = db[0] & zeroMask

  // 10. If the emLen - hLen - sLen - 2 leftmost octets of DB are not zero
  // or if the octet at position emLen - hLen - sLen - 1 (the leftmost
  // position is "position 1") does not have hexadecimal value 0x01,
  // output "inconsistent" and stop.
  const zeroBytes = emLen - HASH_LENGTH - SALT_LENGTH - 2
  for (let i = 0; i < zeroBytes; i++) {
    if (db[i] !== 0) {
      return false
    }
  }

  // 11. Let salt be the last sLen octets of DB.
  const salt = db.subarray(db.length - SALT_LENGTH)

  // 12. Let
  //      M' = (0x)00 00 00 00 00 00 00 00 || mHash || salt ;
  // M' is an octet string of length 8 + hLen + sLen with eight
  // initial zero octets.
  const m2 = Buffer.alloc(8 + HASH_LENGTH + SALT_LENGTH)
  mHash.copy(m2, m2.length - HASH_LENGTH - SALT_LENGTH)
  salt.copy(m2, m2.length - SALT_LENGTH)

  // 13. Let H' = Hash(M'), an octet string of length hLen.
  const hPrima = Buffer.from(await crypto.subtle.digest("SHA-1", m2))

  // 14. If H = H', output "consistent." Otherwise, output "inconsistent."
  for (let i = 0; i < h.length; i++) {
    if (h[i] !== hPrima[i]) {
      return false
    }
  }

  return true
}

async function signRSAPSS(
  message: Buffer,
  d: bigint,
  N: bigint,
  proposedSalt?: Buffer,
): Promise<bigint> {
}

async function verifyRSAPSS(
  message: Buffer,
  signature: bigint,
  e: bigint,
  N: bigint,
  salt: Buffer,
): Promise<boolean> {
}

const aliceKeyPair = await crypto.subtle.generateKey(
  {
    name: "RSA-PSS",
    modulusLength: KEY_LENGTH,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: { name: "SHA-256" },
  },
  true,
  ["sign", "verify"],
)

const pk = await crypto.subtle.exportKey("jwk", aliceKeyPair.privateKey)
const e = toNumber(Buffer.from(pk.e, "base64"))
const d = toNumber(Buffer.from(pk.d, "base64"))
const N = toNumber(Buffer.from(pk.n, "base64"))

const pt = Buffer.from("super important message to sign", "utf8")

const { signature, salt } = await signRSAPSS(pt, d, N)
console.log("Number generated by signer:", signature)

const ok = await verifyRSAPSS(pt, signature, e, N, salt)
console.log("Is signature valid?", ok)
