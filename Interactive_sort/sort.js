const readline = require('readline');

function sortWordsAsk(input) {
  const values = input.split(' ');
  const words = values.filter((value) => !Number(value));
  return words.sort().join(' ');
}

function sortNumbersAsk(input) {
  const values = input.split(' ').map(Number);
  const numbers = values.filter((value) => Number(value));
  return numbers.sort().join(' ');
}

function sortNumbersDesc(input) {
  const values = input.split(' ').map(Number);
  const numbers = values.filter((value) => Number(value));
  return numbers.sort((a, b) => b - a).join(' ');
}

function sortWordsByLetters(input) {
  const values = input.split(' ');
  const words = values.filter((value) => !Number(value));
  return words.sort((a, b) => a.length - b.length).join(' ');
}

function getUniqueWords(input) {
  const values = input.split(' ');
  const words = values.filter((value) => !Number(value));
  const uniqueValues = new Set(words);
  return Array.from(uniqueValues).join(' ');
}

function getUniqueValues(input) {
  const values = input.split(' ');
  const uniqueValues = new Set(values);

  return Array.from(uniqueValues).join(' ');
}

const options = [
  {
    text: 'Words by name (form A to Z)',
    method: sortWordsAsk,
  },
  {
    text: 'Show digits from the smallest',
    method: sortNumbersAsk,
  },
  {
    text: 'Show digits from the bigest',
    method: sortNumbersDesc,
  },
  {
    text: 'Words by quantity of letters',
    method: sortWordsByLetters,
  },
  {
    text: 'Only unique words',
    method: getUniqueWords,
  },
  {
    text: 'Only unique values from the entire set of words and numbers',
    method: getUniqueValues,
  },
];

function createIndexState() {
  let selectedIndex = 0;

  return {
    getCurrentIndex: () => selectedIndex,
    inc: () => (selectedIndex += 1),
    dec: () => (selectedIndex -= 1),
  };
}

function createOptionsRenderer(indexState, options) {
  let initialRender = true;

  return function () {
    if (!initialRender) {
      readline.moveCursor(process.stdout, -999, -options.length);
      readline.clearScreenDown(process.stdout);
    }

    options.forEach((option, index) => {
      const value = indexState.getCurrentIndex() === index ? `* ${option.text}` : option.text;
      process.stdout.write(value + '\n');
    });

    initialRender = false;
  };
}

function createKeyPressedHandler(indexState, options, callback) {
  return function (_, key) {
    if (key) {
      switch (key.name) {
        case 'up':
          if (indexState.getCurrentIndex() !== 0) {
            indexState.dec();
            renderOptions();
          }
          break;
        case 'down':
          if (indexState.getCurrentIndex() !== options.length - 1) {
            indexState.inc();
            renderOptions();
          }
          break;
        case 'return':
          callback(options[indexState.getCurrentIndex()]);
          break;
      }
    }
  };
}

const indexState = createIndexState();
const renderOptions = createOptionsRenderer(indexState, options);

async function main() {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function question(query) {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  }

  const input = await question('Type words or numbers: ');

  if (input === 'exit') {
    process.exit();
  }

  process.stdout.write(`What needs to be done?\n`);
  process.stdout.write(`--------------------\n`);

  function onEnterHandler(selectedOperation) {
    const result = selectedOperation.method(input);

    process.stdout.write(result + '\n');
  }

  const keyPressedHandler = createKeyPressedHandler(indexState, options, onEnterHandler);

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('keypress', keyPressedHandler);

  renderOptions();
}

main();
