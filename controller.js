const prompt = require("prompt-sync")({ sigint: true });
const { gameLevelConstants } = require("./constant");

const playAgain = () => {
  const response = prompt("Do you want to play again!");
  if (response?.toLowerCase() === "yes") {
    gameController();
  } else {
    return;
  }
};

const gameController = () => {
  console.log(
    "Please select the difficulty level:\n\n1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n\n"
  );
  let selectLevel = prompt("Enter your choice:");
  console.log(selectLevel, gameLevelConstants[selectLevel]);

  console.log("Let's start the game!");
  if (selectLevel in gameLevelConstants) {
    console.log(`Great! You have selected the ${
      gameLevelConstants?.[selectLevel]?.label || "Unknown"
    } difficulty level.
    `);
    const randomNumber = Math.round(Math.random() * (100 - 1) + 1);
    console.log(randomNumber, "randomNumber");
    for (let i = 0; i < gameLevelConstants[selectLevel]?.chance; i++) {
      const number = prompt("Enter your guess:");
      if (number == randomNumber) {
        console.log(
          `Congratulations! You guessed the correct number in ${
            i + 1
          } attempts.`
        );
        playAgain();
        i = gameLevelConstants[selectLevel]?.chance;
      } else if (number > randomNumber) {
        console.log(`Incorrect! Please enter a smaller number.`);
        if (i === gameLevelConstants[selectLevel]?.chance - 1) {
          playAgain();
        }
      } else if (number < randomNumber) {
        console.log(`Incorrect! Please enter a bigger number.`);
        if (i === gameLevelConstants[selectLevel]?.chance - 1) {
          playAgain();
        }
      } else {
        console.log("Unknown Input received.");
      }
    }
  } else {
    selectLevel = prompt("Something wrong! Enter your choice:");
  }
};

module.exports = { gameController };
