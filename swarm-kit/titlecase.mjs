/** Capitalize each word in a sentence, preserving whitespace and punctuation. */
export function titlecase(sentence) {
  return sentence.replace(/\p{L}[\p{L}\p{M}\p{N}'’]*/gu, (word) => {
    const letters = [...word.toLowerCase()];
    return letters[0].toUpperCase() + letters.slice(1).join('');
  });
}

export default titlecase;
