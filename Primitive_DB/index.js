const inquirer = require("inquirer");
const fs = require("fs");
const { massage } = require("statuses");
inquirer
  .prompt([
    {
      type: "imput",
      message: "What`s the project title:",
      name: "title",
    },
    {
      type: "imput",
      message: "ENTER the user`s name. To cancel press ENTER:",
      name: "user",
    },
    {
      type: "list",
      message: "Choose your Gender:",
      name: "gender",
      choices: ["male", "female"],
    },
    {
      type: "imput",
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
