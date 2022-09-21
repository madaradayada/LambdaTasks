/**
 * Import necessary native modules.
 */
const readline = require('readline');

async function main() {
  /**
   * Create a readline object. Passing necessary arguments.
   */
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  /**
   * Create a promise to avoid using of callbacks.
   */
  function question(query) {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  }

  /**
   * Ask a question - wait for an answer.
   */
  const input = await question('Type words or numbers:');

  /**
   * Offer some options. Wait for selected one.
   */

  /**
   * Print result.
   */

  /**
   * 'await question(''); -> if input is 'exit' -> rl.close();
   */

  /**
   * Print the result.
   */
  console.log(`Answers: ${input}`);

  /**
   * Close cli.
   */
  rl.close();
}

/**
 * Run main function.
 */
main();
