/** Capitalize each word, retaining punctuation and whitespace. */
export function titlecase(sentence) {
  return sentence.toLowerCase().replace(
    /\p{L}[\p{L}\p{M}\p{N}]*(?:['’][\p{L}\p{M}\p{N}]+)*/gu,
    word => word.replace(/^\p{L}/u, first => first.toUpperCase()),
  );
}

export default titlecase;
