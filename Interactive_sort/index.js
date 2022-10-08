const readline = require('readline');
const {
  sortWordsAsk,
  sortNumbersAsk,
  sortNumbersDesc,
  sortWordsByLetters,
  getUniqueWords,
  getUniqueValues,
} = require('./sort');

const options = [
  {
    text: '1) Words by name (form A to Z)',
    process: sortWordsAsk,
  },
  {
    text: '2) Show digits from the smallest',
    process: sortNumbersAsk,
  },
  {
    text: '3) Show digits from the biggest',
    process: sortNumbersDesc,
  },
  {
    text: '4) Words by quantity of letters',
    process: sortWordsByLetters,
  },
  {
    text: '5) Only unique words',
    process: getUniqueWords,
  },
  {
    text: '6) Only unique values from the entire set of words and numbers',
    process: getUniqueValues,
  },
];

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function question(query) {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  }

  async function selectOperation() {
    options.forEach(({ text }) => {
      process.stdout.write(text + '\n');
    });

    while (true) {
      const action = await question('What needs to be done?: ');

      if (!Number(action)) {
        process.stdout.write('Oops... \n');
        continue;
      }

      const selectedOperation = options[Number(action) - 1];

      if (!selectedOperation) {
        process.stdout.write('Oops... \n');
        continue;
      }

      return selectedOperation;
    }
  }

  while (true) {
    const input = await question('Type words or numbers: ');

    if (input === 'exit') {
      process.exit();
    }

    const selectedOperation = await selectOperation();

    const result = selectedOperation.process(input);

    process.stdout.write(result + '\n');
  }
}

main();
