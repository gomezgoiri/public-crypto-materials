/*
 * Cifra el siguiente mensaje con la clave "HOLA" usando el cifrado Vigenère:
 *
 * "Si contratar a personas por su mérito es una práctica buena y sensata,
 * ¿qué puede tener de malo una meritocracia? ¿Cómo es posible que un principio
 * tan benigno como el del mérito haya alimentado un torrente de resentimiento
 * tan poderoso que ha transformado la política de sociedades democráticas de
 * todo el mundo? ¿Cuándo se volvió tóxico el mérito y cómo lo hizo?"
 *
 * Os debería salir el siguiente mensaje cifrado (Vigenère):
 *
 * 1b266c2227213833293b2d33682e6c312d3d3f2e262e3f6138203e613b3a6c2c8be63e283c20
 * 6c243b6f392f296f3c338bee2f35212c2d612a3a292f296f35613b2a2232293b2d6d688df330
 * 3d8ce561383a29252d6f3824262a3e612c2a6c2c292323613d212d61252a3e283c202f33292c
 * 2520776f8efe0b8cff2c276f2932683f2332212d2024683e3924683a2261383d252f2b263c28
 * 276f3820266f2e2426262b2f276f2f2e25206c24246f2824246f2182e13d2535276f2420312e
 * 6c2024262124263b2d25276f392f683b23333a2a22352d6f2824683d29322d2138282526292f
 * 3c206c3529216c31272b2933273c2361393a2961202e6c353a2e22322e203e2c292b2361242e
 * 6c3127238fec3c262f20682b29613b202f282d2b2d252d3c6c252d2223223a8ced35212c2d32
 * 682b29613c20282e682a2061253a222527706c83f70c3982e921282e683c29613e202037218c
 * ff613c8cff39212c23612d236c2c8be63e283c206c38682c8ff225206c2d276f2428322073
 *
 * Descifrar el mensaje cifrado y llegad al original.
 */

import { Buffer } from "node:buffer"

function encodeVigenere(text: Buffer, key: string): Buffer {
  /*
   * Para aclararos un poco más, podeis consultar la tabla ASCII aquí:
   *    https://upload.wikimedia.org/wikipedia/commons/1/1b/ASCII-Table-wide.svg
   *
   * "HOLA"
   *   |
   *   V
   *  [0x48, 0x4f, 0x4c, 0x41]
   *
   * "Si contratar a personas por su mérito...
   *   |
   *   V
   * [0x53, 0x69, 0x20, 0x63, 0x6f, 0x6e,...]
   *
   * El cifrado se conseguiría haciendo estos XORs:
   *
   * [0x48 xor 0x53, 0x4f xor 0x69, 0x4c xor 0x20, 0x41 xor 0x63, 0x48 xor 0x6f, 0x4f xor 0x6e...]
   *
   * Pista: para saber contra qué byte de la clave hacer XOR, podeis usar el operador "%".
   *
   *    0 % 3 === 0
   *    1 % 3 === 1
   *    2 % 3 === 2
   *    3 % 3 === 0
   *    4 % 3 === 1
   *    ...
   */
}

function decodeVigenere(text: Buffer, key: string): Buffer {
}

const message =
  "Si contratar a personas por su mérito es una práctica buena y sensata, " +
  "¿qué puede tener de malo una meritocracia? " +
  "¿Cómo es posible que un principio tan benigno como el del mérito haya alimentado " +
  "un torrente de resentimiento tan poderoso que ha transformado la política de " +
  "sociedades democráticas de todo el mundo? ¿Cuándo se volvió tóxico el mérito y cómo lo hizo?"
const key = "HOLA"

const ct = encodeVigenere(Buffer.from(message), key)
console.log(
  `Mensaje cifrado con clave ${key}:`,
  ct.toString("hex"),
)

const pt = decodeVigenere(ct, key)
console.log(
  `Mensaje descifrado con clave ${key}:`,
  pt.toString("utf-8"),
)
