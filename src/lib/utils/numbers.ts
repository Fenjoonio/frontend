/**
 * Converts Arabic or Persian strs to English
 * @param {string} text - Text with Arabic or Persian numbers
 * @returns {string} Text with English numbers
 */
export function toEnglishDigits(text: string): string {
  const PERSIAN_OR_ARABIC_NUMBERS_REGEX = /[\u0660-\u0669\u06f0-\u06f9]/g;

  return text.replace(PERSIAN_OR_ARABIC_NUMBERS_REGEX, (c: string) =>
    String(c.charCodeAt(0) & 0xf)
  );
}

/**
 * @param {string} number - You can pass string or number
 */
export function numberSeparator(number: string | number): string {
  if (typeof number != "number" && typeof number != "string") {
    return "";
  }

  return typeof number === "number"
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeSeparators(str: string) {
  return typeof str === "string" ? str.replaceAll(",", "") : str;
}
