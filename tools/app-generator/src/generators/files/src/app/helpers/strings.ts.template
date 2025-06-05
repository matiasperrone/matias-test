// Helper function to generate a random word between 3-8 characters
export const generateRandomWord = (): string => {
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  const vowels = 'aeiou';
  const length = Math.floor(Math.random() * 6) + 3; // 3-8 characters

  let word = '';
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      // Start with consonant, alternate pattern
      word += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      word += vowels[Math.floor(Math.random() * vowels.length)];
    }
  }

  // Capitalize first letter
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Helper function to generate 1-2 random words
export const generateRandomPhrase = (): string => {
  const wordCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 words
  const words: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    words.push(generateRandomWord());
  }

  return words.join(' ');
};
