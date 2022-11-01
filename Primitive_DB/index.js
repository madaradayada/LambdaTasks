const inquirer = require("inquirer");
const fs = require("fs");
const readline = require("readline");

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
    const searchUser = await promisifyInquirer([
      {
        type: "input",
        message: "ENTER a search name:",
        name: "search",
      },
    ]);



    const rl = readline.createInterface({
      input: fs.createReadStream(FILE_NAME),
    });

    let users = [];

    for await (const line of rl) {
      const user = JSON.parse(line);

      users.push(user);
    }

//     var search = searchUser.search;
// var result = users.filter(function(el){
//     for(var field in el){
//         if(el[field].toLowerCase().indexOf(search.toLowerCase()) > -1){
//             return true;//если нашли хотя бы одно поле содержащее искомую строку, оставляем объект
//         }
//     }
//     return false;
// });
var search = searchUser.search;
var result = users.filter(function(el){
  return el.name.toLowerCase().indexOf(search.toLowerCase()) > -1;//fieldName - поле по которому нужно фильтровать
});

console.log(result);
    /**
     * Filter/search on users array, print results.
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
