/**
 * ISL (Indian Sign Language) Word-to-Image Mapping Utility
 * Maps words to their corresponding ISL images in the public/isl_images folder
 */

// Base path for ISL images
const ISL_IMAGES_BASE = '/isl_images';
const NUMBERS_BASE = '/isl_images/numbers';

/**
 * Mapping of words to their ISL image files
 * Currently available images: isl_changed.jpeg, isl_delayed.jpeg, isl_minutes.jpeg, isl_train.jpeg
 * Add more mappings as images are added
 */
export const WORD_TO_IMAGE_MAP = {
  // Available ISL images
  'train': `${ISL_IMAGES_BASE}/isl_train.jpeg`,
  'trains': `${ISL_IMAGES_BASE}/isl_train.jpeg`,
  'changed': `${ISL_IMAGES_BASE}/isl_changed.jpeg`,
  'change': `${ISL_IMAGES_BASE}/isl_changed.jpeg`,
  'delayed': `${ISL_IMAGES_BASE}/isl_delayed.jpeg`,
  'delay': `${ISL_IMAGES_BASE}/isl_delayed.jpeg`,
  'minutes': `${ISL_IMAGES_BASE}/isl_minutes.jpeg`,
  'minute': `${ISL_IMAGES_BASE}/isl_minutes.jpeg`,
};

/**
 * Number to image mapping (0-9)
 * Note: file for 1 is named 'ils_1.jpeg' (with lowercase L)
 */
export const NUMBER_TO_IMAGE_MAP = {
  '0': `${NUMBERS_BASE}/isl_0.jpeg`,
  '1': `${NUMBERS_BASE}/ils_1.jpeg`,
  '2': `${NUMBERS_BASE}/isl_2.jpeg`,
  '3': `${NUMBERS_BASE}/isl_3.jpeg`,
  '4': `${NUMBERS_BASE}/isl_4.jpeg`,
  '5': `${NUMBERS_BASE}/isl_5.jpeg`,
  '6': `${NUMBERS_BASE}/isl_6.jpeg`,
  '7': `${NUMBERS_BASE}/isl_7.jpeg`,
  '8': `${NUMBERS_BASE}/isl_8.jpeg`,
  '9': `${NUMBERS_BASE}/isl_9.jpeg`,
};

/**
 * Normalize a word for lookup (lowercase, remove punctuation)
 */
export function normalizeWord(word) {
  return word.toLowerCase().replace(/[^\w]/g, '');
}

/**
 * Check if a word is a number
 */
export function isNumber(word) {
  return /^\d+$/.test(word);
}

/**
 * Get image path for a word
 * Returns the image path if found, null otherwise
 */
export function getImageForWord(word) {
  const normalized = normalizeWord(word);

  // Check if it's a number
  if (isNumber(normalized)) {
    // For multi-digit numbers, split into individual digits
    if (normalized.length > 1) {
      return normalized.split('').map(digit => NUMBER_TO_IMAGE_MAP[digit] || null);
    }
    return NUMBER_TO_IMAGE_MAP[normalized] || null;
  }

  // Check word mapping
  return WORD_TO_IMAGE_MAP[normalized] || null;
}

/**
 * Convert text to a sequence of image paths
 * Returns an array of { word, imagePath } objects
 */
export function textToImageSequence(text) {
  if (!text) return [];

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sequence = [];

  for (const word of words) {
    const imagePath = getImageForWord(word);

    if (imagePath) {
      if (Array.isArray(imagePath)) {
        // Multi-digit number - each digit gets its own image
        imagePath.forEach((path, idx) => {
          if (path) {
            sequence.push({
              word: word[idx] || word,
              imagePath: path,
              originalWord: word
            });
          }
        });
      } else {
        sequence.push({
          word,
          imagePath,
          originalWord: word
        });
      }
    } else {
      // Word not found in mapping - add without image
      sequence.push({
        word,
        imagePath: null,
        originalWord: word
      });
    }
  }

  return sequence;
}

/**
 * Get all available words that have ISL images
 */
export function getAvailableWords() {
  return Object.keys(WORD_TO_IMAGE_MAP);
}

/**
 * Get all available numbers
 */
export function getAvailableNumbers() {
  return Object.keys(NUMBER_TO_IMAGE_MAP);
}

export default {
  WORD_TO_IMAGE_MAP,
  NUMBER_TO_IMAGE_MAP,
  normalizeWord,
  isNumber,
  getImageForWord,
  textToImageSequence,
  getAvailableWords,
  getAvailableNumbers,
};