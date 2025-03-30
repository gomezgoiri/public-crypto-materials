/*
 * Implement CBC's padding adding/removal functions.
 *
 * Padding test cases:
 *    0x (empty buffer) => 0x1010..10 (16 bytes)
 *    0xff => 0xff0f0f..0f (16 bytes)
 *    0xffff => 0xff0e0e..0e (16 bytes)
 *    0xffffffffffffffffffffffff => 0xffffff...04040404 (16 bytes)
 *    0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeee => 0xeeee...ee01 (16 bytes)
 *    0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee => 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1010...10 (32 bytes)
 *    0x1234567890abcdef1234567890abcdef01 => 0x1234567890abcdef1234567890abcdef010f0f...0f (32 bytes)
 *    0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd => 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd01 (48 bytes)
 *
 * Use outputs as inputs and viceversa to test the unpad function.
 */

import { Buffer } from "node:buffer"

function cbcPad(data: Buffer): BufferSource {
}

function cbcUnpad(data: Buffer): BufferSource {
}

console.log(cbcPad(Buffer.from("ffff", "hex")))
console.log(
  cbcUnpad(
    Buffer.from(
      "001234567890abcdef1234567890abcdef010e0e0e0e0e0e0e0e0e0e0e0e0e0e",
      "hex",
    ),
  ),
)
