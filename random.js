export function shuffleArray(array) {
  // Start from the last element and work backwards
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index 'j' from 0 up to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap element array[i] with element array[j]
    // This uses array destructuring for an elegant swap
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}