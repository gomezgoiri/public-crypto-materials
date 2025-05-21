import { Buffer } from "node:buffer"

function toNumber(buffer: Buffer): bigint {
  return BigInt("0x" + buffer.toString("hex"))
}

/**
 * En cada operación de exponente, se calcula su módulo.
 * El resultado será el mismo pero por el camino el tamaño del número no crecerá tanto.
 *
 * Ver explicación:
 *    https://stackoverflow.com/questions/75386820/typescript-bigint-exceeds-non-specified-maximum-rangeerror-maximum-bigint-s
 *
 * @returns base**exp %% p
 */
function powermod(base: bigint, exp: bigint, p: bigint) {
  let result = 1n
  while (exp !== 0n) {
    if (exp % 2n === 1n) result = result * base % p
    base = base * base % p
    exp >>= 1n
  }
  return result
}

export { powermod, toNumber }
