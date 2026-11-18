/** Capitalize each whitespace-delimited word and lowercase its remaining letters. */
export function titlecase(value) {
  return value.replace(/\S+/gu, word => {
    const characters = Array.from(word);
    return characters[0].toUpperCase() + characters.slice(1).join('').toLowerCase();
  });
}

export default titlecase;
