/*
 * Utility library. Functions which can be reused in more than one exercise.
 */

import frequencies from "./frequencies.json" with { type: "json" }

export const possibleLanguages = [
  "hu",
  "cz",
  "fi",
  "ic",
  "da",
  "du",
  "po",
  "sw",
  "tu",
  "it",
  "pt",
  "sp",
  "ge",
  "fr",
  "en",
]

export type PossibleLanguage = typeof possibleLanguages[number]

/**
 * Función para puntuar la frecuencia de un caracter en un idioma dado.
 *
 * @param byte Byte que representa un caracter en ASCII.
 * @param lang Idioma a seleccionar.
 * @returns Frecuencia de aparición de dicho byte en ese idioma.
 */
function getCharScore(byte: number, lang: PossibleLanguage) {
  const langFreq = frequencies[lang]
  const str = String.fromCharCode(byte)
  const normalized = str.toLocaleLowerCase()
  if (!!langFreq[normalized]) {
    let freq = langFreq[normalized]
    if (str != normalized) {
      freq /= 5 // We assume uppercase is less common
    }
    return freq
  }
  return 0 // we do not score it
}

export { getCharScore }
