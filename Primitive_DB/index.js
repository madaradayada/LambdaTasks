const inquirer = require("inquirer");
const fs = require("fs");
const { exit } = require("process");

inquirer
  .prompt([
    {
      type: "input",
      message: "What`s the project title:",
      name: "title",
    },
    {
      type: "input",
      message: "ENTER the user`s name. To cancel press ENTER:",
      name: "user",
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
      choices: ["male", "female"],
    },
    {
      type: "input",
      message: "ENTER your age:",
      name: "age",
    },
  ])
  .then(({ user, gender, age, title }) => {
    const template = `{name: ${user}, gender: ${gender}, age: ${age}}`;
    //function to create our users file
    createNewFile(title, template);
  });

//creating our  createNewFile function
function createNewFile(fileName, data) {
  fs.writeFile(
    `./${fileName.toLowerCase().split(" ").join("")}.txt`,
    data,
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Your file has been generated");
    }
  );
}
