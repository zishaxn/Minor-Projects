#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { async } from "rxjs";

let playerName;

// used to create a delay of 2s , whenever used in the program.
const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};


// display welcome message and aout the game
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be A Javacsript Millionaire? \n",
  );
  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    so get all the questions right...
`);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "what is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "Javascript was created in 10 days then released on \n",
    choices: ["Dec 4, 1995", "Nov 4, 1995", "Jan 4, 1995", "May 4, 1995"],
  });
  return handleAnswer(answers.question1 === "Dec 4, 1995");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question2",
    type: "list",
    message: "Javascript is an _______ language? \n",
    choices: ["Object-Based", "Object-Oriented", "Procedural"],
  });
  return handleAnswer(answers.question2 === "Object-Oriented");
}
async function question3() {
  const answers = await inquirer.prompt({
    name: "question3",
    type: "list",
    message:
      "Which of the following keywords is used to define a block scoped variable in Javascript? \n",
    choices: ["const", "let", "var", "None of the above"],
  });
  return handleAnswer(answers.question3 === "let");
}
async function question4() {
  const answers = await inquirer.prompt({
    name: "question4",
    type: "list",
    message:
      "Upon encountering empty statements, what does the Javascript Interpreter do? \n",
    choices: [
      "Throws an error",
      "Gives a warning",
      "ignore the statements",
      "undefined",
    ],
  });
  return handleAnswer(answers.question4 === "ignore the statements");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. Thats a legit answer.`,
    });
  } else {
    spinner.error({
      text: `OOPS !! 💀💀💀 Game Over, you lose ${playerName}!`,
    });
    process.exit();
  }
}


await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();


// to display the congrats message in ascii and in rainbow colors
function winner() {
  console.clear();
  const msg = `Congrats  ,  ${playerName} ! \n Here  is  1,000,000,0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

winner();
