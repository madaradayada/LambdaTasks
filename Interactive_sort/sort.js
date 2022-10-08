function removeNumbers(input) {
  const values = input.split(' ');
  const words = values.filter((value) => !Number(value));

  return words;
}

function removeSymbols(input) {
  const values = input.split(' ');
  const numbers = values.filter((value) => Number(value));

  return numbers.map(Number);
}

function sortWordsAsk(input) {
  const words = removeNumbers(input);

  return words.sort().join(' ');
}

function sortNumbersAsk(input) {
  const numbers = removeSymbols(input);

  return numbers.sort().join(' ');
}

function sortNumbersDesc(input) {
  const numbers = removeSymbols(input);

  return numbers.sort((a, b) => b - a).join(' ');
}

function sortWordsByLetters(input) {
  const words = removeNumbers(input);

  return words.sort((a, b) => a.length - b.length).join(' ');
}

function getUniqueWords(input) {
  const words = removeNumbers(input);
  const uniqueValues = new Set(words);

  return Array.from(uniqueValues).join(' ');
}

function getUniqueValues(input) {
  const values = input.split(' ');
  const uniqueValues = new Set(values);

  return Array.from(uniqueValues).join(' ');
}

module.exports = {
  sortWordsAsk,
  sortNumbersAsk,
  sortNumbersDesc,
  sortWordsByLetters,
  getUniqueWords,
  getUniqueValues,
};
