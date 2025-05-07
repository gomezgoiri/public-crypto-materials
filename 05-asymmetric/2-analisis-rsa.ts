/*
 * Cread un par de claves usando RSA para Alice.
 *
 * Usad la función "exportKey" de Subtle Crypto para ver los elementos de los que está compuesta.
 * Identificadlos con lo visto en teóría.
 *
 * Comprobad que p*q = N.
 *
 * Comprobad que un número grande aleatorio al exponente "e" y luego al exponente "d".
 *
 * ¿Qué problema detectais al hacer exponente de un número tan grande?
 *
 * Se puede solucionar usando nuestra propia versión de exponente modular que en cada paso (multiplicación) calcule el módulo.
 *
 *  65537 = 2^16 + 1
 *  65537 = (en binario) 1 0000 0000 0000 0001
 *  B^65537 = B^(2^(16)+1) = B^(2^16) * B^(2^0) = B^(2^16) * B^1 = B^(2^16) * B
 *
 *  65553 = (en binario) 1 0000 0000 0001 0001
 *  B^65553 = B^(2^(16)+2^4+1) = B^(2^16) * B^(2^4) * B^(2^0) = B^(2^16) * B^(2^4) * B
 */

/**
 * @returns Número cifrado: base**exponente mod modulo
 *
 * En pseudo-código (versión subóptima):
 *      i desde 0 a 16:
 *        Si en esa posición tengo un 1 en el exponente:
 *          temp = (base * base) mod N (repetir i veces)
 *        resultado = resultado * temp
 *
 *  En pseudo-código (versión mejorada):
 *      i desde 0 a 16:
 *        base = (base * base) mod N
 *        Si en esa posición tengo un 1:
 *          resultado = resultado * base
 *
 * En pseudo-código (versión mejorada y generalizada):
 *    mientras e !== 0:
 *      código anterior
 *      e = e >> 1
 */
function potencia(base: bigint, exponente: bigint, modulo: bigint) {
}

// Creamos clave asimétrica, la exportamos y extraemos sus propiedades interesantes: e, d, N

// Aviso: textbook implementation, nunca ciframos directamente el mensaje.
const m = 0x234253466654575667654355abcdef4556776575675n // Número a cifrar
const ct = potencia(m, e, N) // Número cifrado: m**e mod N
const pt = potencia(ct, d, N) // Número descifrado: ct**d mod N
