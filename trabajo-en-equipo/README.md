# Trabajo grupal

Debereis simular el funcionamiento de una red blockchain.

## Descripción

Id desarrollando el proyecto de forma incremental (mejorandolo paso a paso).

### Paso 1

Cread una estructura de datos que simule una cadena de bloques:

- Una transacción contiene:
  - Firma del emisor
  - Receptor
  - Cantidad a transmitir
  - Un hash de la transacción
  - La firma del emisor (que gestionará su propia clave privada)
- Un bloque contiene:
  - El hash del bloque anterior (para poder crear la cadena de bloques)
  - Un grupo de transacciones.
  - Un hash de dicho grupo de transacciones para no permitir que se modifiquen a
    posteriori.
  - Un hash de todo el contenido del bloque.
  - Una firma del nodo que lo creó.

### Paso 2

Hacer un snapshoot de la cadena de bloques usando criptografía de bloques.
Guardarlo en un fichero y comprobad que podriais reanudar un nodo partiendo de
ese fichero.

### Paso 3

Cread un programa para
[crear credenciales](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey)
con el método de criptografía asimétrica que elijais.
[Exportad](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey)
esas credenciales a un fichero.

Cread otro programa para firmar una transacción:

- Fichero de entrada con credenciales del usuario (pasadlo como argumento)
- Se pedirá un password que se introduzca por terminal para descifrar ese
  fichero
- Fichero de salida con el hexadecimal de la transacción. Podeis guardar los
  ficheros de las distintas transacciones que creeis en una misma subcarpeta.
  Esto simulará una cola de transacciones que los nodos podrán coger para minar.

### Paso 4

Simulad un "protocolo" sencillo de intercambio de bloques entre nodos:

- Existirán 4 nodos (por ejemplo)
- Se elige un nodo aleatoriamente para minar un nuevo bloque cada 10 segundos.
- Ese nodo coge algunas de las transacciones validas que tiene a su disposición
  y las incluye en un nodo bloque.
- El nodo comparte con el resto este nuevo bloque usando criptografía de flujo.
  - En la versión 2, estos nodos compartirán una clave aleatoria durante el
    inicio.

Ante la recepción de un bloque, cada nodo validará lo siguiente:

- Que esté vinculado al último bloque del que tiene noticia (hash que haga
  referencia al mismo)
- Que contenga una firma correcta de uno de los 4 nodos existentes
- Que contenga transacciones válidas

### Paso 5

En la versión 1, si alguien captura una transacción, la puede volver a enviar al
nodo tantas veces como quiera. Así, si Alice envía a Bob 5 euros, este podría
capturar esa transacción y enviarla multiples veces para recibir más euros (10,
15, 20...). Diseñar un mecanismo para evitar esto. Pista: añadiendo un parámetro
que cambie en todas las transacciones.

### Paso 6

Para acordar una clave de cifrado de flujo entre dos nodos, usad el protocolo
Diffie-Hellman.

## Evaluación

Probad vuestro simulador con los siguientes datos de prueba:

- 100 cuentas con saldo suficiente.​
- De 1 a 30 (aleatorio) TX por bloque entre esas u otras cuentas.​
- Llegad hasta los 100 bloques.​
- Comprobad que el balance de cada usuario es el esperable.

Se demostrarán las siguientes funcionalidades:

- Intercambio de datos correcto entre nodos​ usando cifrado en flujo​
- Almacenamiento de estado de la red​ con cifrado por bloques y recuperación de
  la misma
- Correcta estructura de datos de las transacciones y bloques usando hashes y
  firmas
- Funciones de consulta a implementar en cada nodo:
  - Mantenimiento del estado de la red. Función de consulta del balance de una
    cuenta en el bloque N​.
  - Listado de transacciones incluidas en cada bloque​
  - Devolver un TX en base a su hash​
  - Devolver el número de bloque dado su hash​

Asimismo, vuestro simulador debe mostrar errores ante las siguientes situaciones
e ignorar transacciones o bloques invalidos:

- Un nodo recibe una transacción con una firma invalida
- Un nodo recibe una transacción de una cuenta que no tiene suficientes fondos a
  otra
- Un nodo recibe un bloque no vinculado con el anterior
- Un nodo recibe un bloque con una firma incorrecta
- Un nodo recibe un bloque con una transacción invalida
