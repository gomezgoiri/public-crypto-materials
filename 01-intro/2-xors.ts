/*
 * Ejercicio 2: uso de XOR
 *
 *  Tenemos los siguientes valores:
 *    a) 0xa4
 *    b) 0x93
 *    c) 0xa478020098
 *    d) 0x9308701299
 *    e) 0x930870
 *
 *  Haced  XOR entre los siguientes valores:
 *    - a xor b
 *    - c xor d
 *    - c xor e
 */

import { Buffer } from "node:buffer"

const a = 0xa4
const b = 0x93
const c = Buffer.from([0xa4, 0x78, 0x02, 0x00, 0x98])
// Or: const c = Buffer.from("a478020098", "hex")
const d = Buffer.from([0x93, 0x08, 0x70, 0x12, 0x99])
const e = Buffer.from("930870", "hex")

const ab = Number(a ^ b).toString(16)
console.log(`0xa4 xor 0x93 = 0x${ab}`)

const cd = Buffer.alloc(c.length)
for (let i = 0; i < c.length; i++) {
  cd[i] = c[i] ^ d[i]
}
console.log("C xor D:", cd.toString("hex"))

// O en una única línea de código:
// const cd = Buffer.from(a.map((ai, i) => ai ^ b[i]))

// C xor E (alternativa 1): xor en un for
const length = Math.max(c.length, d.length)
const ce = Buffer.alloc(length)
for (let i = 0; i < length; i++) {
  // Ojo, en JS no hay "out of bounds", simplemente devuelve "undefined".
  // La operación XOR convierte los elementos a números.
  // Number(undefined) === NaN (lo mismo pasaría con null o false)
  // NaN en operaciones a nivel de bytes, opera como 0
  // Luego undefined se convierte en 0x00 y al hacer xor: y ^ undefined = y
  ce[i] = c[i] ^ e[i]
}
console.log("C xor E:", ce.toString("hex"))

// C xor E (alternativa 2): padding
function pad(buffer: Buffer, newSize: number): Buffer {
  if (buffer.length < newSize) {
    const difference = newSize - buffer.length
    const padding = Buffer.alloc(difference, 0x0)
    return Buffer.concat([buffer, padding])
  } // else
  return buffer
}

function equalizeSizes(buff1: Buffer, buff2: Buffer): Buffer[] {
  if (buff1.length === buff2.length) {
    return [buff1, buff2]
  }

  if (buff1.length < buff2.length) {
    return [pad(buff1, buff2.length), buff2]
  }
  // else

  return [buff1, pad(buff2, buff1.length)]
}

// Deconstructing in Javascript.
// See: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const [c2, e2] = equalizeSizes(c, e)
console.log("Padded D:", e2.toString("hex"))

const ce2 = Buffer.alloc(c2.length) // c2.length === e2.length
for (let i = 0; i < length; i++) {
  if (c2[i] === undefined || e2[i] === undefined) {
    throw new Error("¡Esto no debería pasar!")
  }
  ce2[i] = c2[i] ^ e2[i]
}
console.log("C xor E (usando padding):", ce2.toString("hex"))
