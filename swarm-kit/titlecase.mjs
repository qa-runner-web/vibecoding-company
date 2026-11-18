/** Capitalize each word while preserving whitespace and punctuation. */
export function titlecase(sentence) {
  return sentence.toLowerCase().replace(
    /[\p{L}\p{M}\p{N}]+(?:['’][\p{L}\p{M}\p{N}]+)*/gu,
    word => word.replace(/\p{L}/u, letter => letter.toUpperCase()),
  );
}

export default titlecase;
