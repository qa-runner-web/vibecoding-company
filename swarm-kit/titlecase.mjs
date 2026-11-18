/** Capitalize each word and lowercase its remaining letters, preserving separators. */
export function titlecase(sentence) {
  return sentence.replace(/[\p{L}\p{N}][\p{L}\p{M}\p{N}]*(?:['’][\p{L}\p{M}\p{N}]+)*/gu, word => {
    const lower = word.toLowerCase();
    const first = Array.from(lower)[0];
    return first.toUpperCase() + lower.slice(first.length);
  });
}

export default titlecase;
