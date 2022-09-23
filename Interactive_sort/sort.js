const readline = require('readline');

function sortWordsAsk(input) {
  let words;
  words = input.split().sort();
  console.log(words);
}

// const sortWordsAsk = input => input.split().sort((a, b) => a.localeCompare(b));

// function sortNumbersAsk(input) {
//   console.log('sortNumbersAsk WAS TRIGGERED ' + input);
// }

const sortNumbersAsk = input => input.split().sort((a,b) => a.localeCompare(b));

// function sortNumbersDesc(input) {
//   console.log('sortNumbersDesc WAS TRIGGERED ' + input);
// }  

const sortNumbersDesc = input => input.split().sort((a,b) => b.localeCompare(a));

// function sortWordsByLetters(input) {
//   console.log('sortWordsByLetters WAS TRIGGERED ' + input);
// }

const sortWordsByLetters = input => input.split().sort((a,b) => a.length - b.length);


function getUniqueWords(input) {
  let result = [];

  for (let str of input) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  console.log(result);
  // return result;

}


function getUniqueWordsNumbers(input) {
  let result = [];

  for (let str of input) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  console.log(result);
  // return result;
  console.log('getUniqueWordsNumbers WAS TRIGGERED ' + input);
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
    text: 'only unique values from the entire set of words and numbers',
    method: getUniqueWords,
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

  process.stdout.write(`What needs to be done?\n`);
  process.stdout.write(`--------------------\n`);

  function onEnterHandler(selectedOperation) {
    selectedOperation.method(input);
  }

  const keyPressedHandler = createKeyPressedHandler(indexState, options, onEnterHandler);

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('keypress', keyPressedHandler);

  renderOptions();

  // rl.close();
}

main();
