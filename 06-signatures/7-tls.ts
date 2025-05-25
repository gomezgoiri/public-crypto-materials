/**
 * Simulación del protocolo de negociación de claves con TLS.
 *
 * Conocemos y confiamos en la clave pública de "Root CA". Este firma la de "Intermediate CA".
 * "Intermediate CA" firma la de "Intermediate CA2" y este dos certificados para "Alice" (suponed que tiene dos servidores a su cargo).
 *     https://security.stackexchange.com/questions/20803/how-does-ssl-tls-work/20847#20847
 *
 * Los servidores implementan diferentes estrategias para acordar claves con los clientes:
 *      - Basado en Diffie-Hellman (ECDH)
 *      - MLKEM (post-cuántica)
 *
 * Como parte del handshake, el servidor de Alice facilita su certificado y los CAs intermedios que pudiera requerirse.
 *
 * Bob verifica el certificado de Alice con la "Intermediate CA".
 * Bob verifica el "Intermediate CA" con el "Root CA" que tenía guardado como uno de sus CAs de confianza.
 *
 * Si todo es correcto, usa la clave pública de Alice para acordar una clave con la que comunicarse con ella.
 * Bob elige una de las estrategias descritas anteriormente.
 * En la práctica, podría acordar qué estrategia usar (https://es.wikipedia.org/wiki/Seguridad_de_la_capa_de_transporte#Intercambio_de_claves).
 * Nosotros por simplificar, asumiremos que usamos una estrategia distinta dependiendo de si nos comunicamos con el servidor 1 o el servidor 2 de Alice.

 * Intercambiad 2 mensajes de cada lado usando AES GCM como algoritmo de criptografía simétrica.
 */

export type EncryptionAlgorithm = "RSA_OAEP" | "ECDH" | "RSA_ISO" | "MLKEM"

export type SigningAlgorithm = "RSA_PSS" | "ECDSA" | "MLDSA" | "SLHDSA"

export type Certificate = {
  expiration: number // Timestamp de cuando deja de ser válido
  issuer: string // Pub key de la CA en hex
  caAlgorithm: string // Algoritmo usado para firmar por la CA
  // Ponerles distintos y a ver si se aclaran
  pkAlgorithm: EncryptionAlgorithm // algoritmo de cifrado que sea
  pubKey: string // en hex, la clave que sea
  signAlgorithm: SigningAlgorithm
  signature: string // firma de todos los campos menos signAlgorithm en hex
}

const serverMsgs = ["Aquí te envío el CSS", "Aquí te envío un fichero HTML"]
const clientMsgs = [
  "Hola, soy el cliente y quiero ver esta web",
  "Todo ok, muchas gracias.",
]
