const inquirer = require("inquirer");
const fs = require("fs");

const FILE_NAME = "data.txt";

function promisifyInquirer(questions) {
  return new Promise((resolve) => {
    inquirer.prompt(questions).then(resolve);
  });
}

async function main() {
  if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, "");
  }

  async function findUser() {
    // TODO: To be continued...
    /**
     * Ask user an input: promisifyInquirer(...);
     *
     * Get data from 'data.txt': fs.readWileSync(FILE_NAME);
     * Read line by line; JSON.parse each line; push to an array
     *
     * ??? Filter data with input
     *
     * Show result
     */
  }

  async function insertUser() {
    const GENDER = {
      MALE: "male",
      FEMALE: "female",
    };

    const data = await promisifyInquirer([
      {
        type: "input",
        message: "ENTER the user`s name. To cancel press ENTER:",
        name: "name",
        validate: (answer) => {
          if (answer === "") {
            console.log("Bay bay. See you next time");
            process.exit();
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Choose your Gender:",
        name: "gender",
        choices: [GENDER.MALE, GENDER.FEMALE],
      },
      {
        type: "input",
        message: "ENTER your age:",
        name: "age",
      },
    ]);

    fs.appendFileSync(FILE_NAME, JSON.stringify(data) + "\n");
  }

  while (true) {
    const ACTION_LIST = {
      INSERT_USER: "create user",
      FIND_USER: "find user",
      EXIT: "exit",
    };

    const { action } = await promisifyInquirer([
      {
        type: "list",
        message: "Choose an action:",
        name: "action",
        choices: [
          ACTION_LIST.INSERT_USER,
          ACTION_LIST.FIND_USER,
          ACTION_LIST.EXIT,
        ],
      },
    ]);

    switch (action) {
      case ACTION_LIST.INSERT_USER:
        await insertUser();
        break;
      case ACTION_LIST.FIND_USER:
        await findUser();
        break;
      case ACTION_LIST.EXIT:
        process.exit();
    }
  }
}

main();
