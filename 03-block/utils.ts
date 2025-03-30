import { Buffer } from "node:buffer"

const nullIv = Buffer.alloc(16) // All zeroes, as if we don't apply it
const AES_CONFIG = { name: "AES-CBC", iv: nullIv }

async function aesEnc(key: CryptoKey, data: Uint8Array): Promise<Uint8Array> {
  if (data.byteLength > 16) {
    throw new Error("An block should be max 16 bytes long")
  }

  // Crypto Subtle adds the pad if not already added,
  // therefore we should strip it before returning it to mimic aesEnc.
  const ret = new Uint8Array(
    await crypto.subtle.encrypt(AES_CONFIG, key, data),
  )

  return ret.length > 16 ? ret.slice(0, 16) : ret
}

function calculateDummyBlock(
  key: CryptoKey,
  data: Uint8Array,
): Promise<ArrayBuffer> {
  // We put a fake padding block so the decryption in CBC mode works
  const dummyContent = Buffer.alloc(16, 0x10)
  const dummyBlockXored = dummyContent.map((v, i) => v ^ data[i])
  return crypto.subtle.encrypt(AES_CONFIG, key, dummyBlockXored)
}

async function aesDec(key: CryptoKey, data: Uint8Array): Promise<Uint8Array> {
  if (data.byteLength !== 16) {
    // Both in ECB and in CBC
    throw new Error("An encrypted block should be 16 bytes long")
  }

  try {
    // Only last block will work with only one block
    return new Uint8Array(await crypto.subtle.decrypt(AES_CONFIG, key, data))
  } catch {
    // For the rest of the blocks, we simulate the dummy block so
    // they are decrypted by AES CBC decryptor
    const dataWithDummyBlock = new Uint8Array(32)
    Buffer.from(data).copy(dataWithDummyBlock)

    // concat data with dummy block
    const dummyBlock = await calculateDummyBlock(key, data)
    Buffer.from(dummyBlock).copy(dataWithDummyBlock, 16)
    return new Uint8Array(
      await crypto.subtle.decrypt(AES_CONFIG, key, dataWithDummyBlock),
    )
  }
}

function toBuffer(number: bigint, byteLength: number = 16): Buffer {
  const hexStr = number.toString(16).padStart(byteLength * 2, "0")

  if (hexStr.length > byteLength * 2) {
    throw new Error(
      `The number provided cannot fit in ${byteLength} bytes, reset keys!`,
    )
  }

  return Buffer.from(hexStr, "hex")
}

export { aesDec, aesEnc, toBuffer }
