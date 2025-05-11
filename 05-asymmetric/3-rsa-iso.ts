/*
 * Cread un par de claves usando RSA para Alice.
 *
 * Bob crea un número aleatorio B.
 * k = SHA-256(B) (clave simétrica a usar en AES GCM)
 * Cifra texto con k
 *
 * Bob cifra B con la clave pública de Alice.
 * Bob se lo envía a Alice junto al texto cifrado.
 * Alice lo descifra.
 * Alice calcula k.
 * Alice descifra mensaje recibido de Bob.
 */

import { Buffer } from "node:buffer"

type RSAMethod = "encrypt" | "decrypt"

// Alternative 1: sha-256 over "x" and create GCM key
async function deriveAESGCMKey1(
  x: Uint8Array,
  method: RSAMethod,
): Promise<CryptoKey> {}

type KeyAndSalt = { key: CryptoKey; salt: Uint8Array }

// Alternative 2: use Subtle Crypto's HKDF to derive the GCM key
async function deriveAESGCMKey2(
  x: Buffer,
  method: RSAMethod,
  salt?: Uint8Array,
): Promise<KeyAndSalt> {
}

async function encrypt(message: Buffer, publicKey: CryptoKey) {
  // Elegimos x aleatorio
  // y <- RSA(x)
  // k <- hash(x)
  // ct <- encryptAES(k, m)
  // Devolvemos y, ct

  return
}

async function decrypt(
  cipherText: Buffer,
  y: Buffer,
  privateKey: CryptoKey,
  iv: Buffer,
  salt?: Uint8Array,
): Promise<Buffer> {
  // x <- RSA-1(y)
  // k <- hash(x)
  // pt <- encryptAES(k, ct)
  // Devolvemos pt
}

const aliceKeyPair = null

const plainText = Buffer.from(
  "You may reasonably ask why, if we are such great cooperators, there is so much interpersonal aggression. One reason is that exposure to threat brings out selfish tendencies.",
  "utf8",
)

// Llamado por Bob
const ct = await encrypt()

// Llamado por Alice
const decryption = await decrypt()
console.log("Decrypted data:", Buffer.from(decryption).toString("utf8"))

// A partir de este punto, podrían seguir comunicandose actualizando IV con el protocolo que acuerden.
