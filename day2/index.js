return console.error('enter puzzle input below then remove this');
const rawInput = ``;

let redTotal = 12;
let greenTotal = 13;
let blueTotal = 14;

const largestHandTracker = {};

// Round
//   Game
//      Set
//        Hand

function checkHand({ red, green, blue }, gameId) {
  let handIsPossible = true;
  console.log(red, green, blue);
  if (red > redTotal || green > greenTotal || blue > blueTotal) {
    handIsPossible = false;
  }

  if (!largestHandTracker[gameId]) {
    largestHandTracker[gameId] = {
      red: 0,
      green: 0,
      blue: 0
    };
  }

  let thisRed = isNaN(red) ? 0 : red;
  let thisGreen = isNaN(green) ? 0 : green;
  let thisBlue = isNaN(blue) ? 0 : blue;

  // yup, just store the biggest seen within each game's hand
  largestHandTracker[gameId].red = Math.max(largestHandTracker[gameId].red, thisRed);
  largestHandTracker[gameId].green = Math.max(largestHandTracker[gameId].green, thisGreen);
  largestHandTracker[gameId].blue = Math.max(largestHandTracker[gameId].blue, thisBlue);

  return handIsPossible;
}

function checkSet(sets, gameId) {
  let setIsPossible = true;
  for (let i = 0; i < sets.length; i++) {
    let handIsPossible = checkHand(sets[i], gameId);
    if (!handIsPossible) {
      setIsPossible = false;
    }
  }

  return setIsPossible;
}

function newRound(gameList) {
  const possibleGames = [];

  for (let i = 0; i < gameList.length; i++) {
    const game = gameList[i];
    const gameNum = i + 1;

    const gameIsPossible = checkSet(game, gameNum);

    if (gameIsPossible) {
      possibleGames.push(gameNum);
    }
  }

  return possibleGames;
}

function addUpGameIds(gameIds) {
  return gameIds.reduce((total, nextId) => {
    return total + nextId;
  }, 0);
}

function addUpGamePowers(games) {
  let total = 0;
  for (let game in games) {
    const gameTotal = games[game].red * games[game].green * games[game].blue;
    total += gameTotal;
  }
  return total;
}

function parseInput(input) {
  let games = input.split('\n');
  games = games.map((game) => {
    const mainText = game.split(':')[1].trim();
    let rounds = mainText.split(';');

    // map each round into an object of totals
    rounds = rounds.map((round) => {
      const hands = round.trim().split(',');

      const coloursAndIndex = {};

      // colour appears after the number
      const colours = hands.map((hand, index) => {
        hand = hand.trim();
        const [count, colour] = hand.split(' ');
        coloursAndIndex[colour] = { count, index };
        return;
      });

      // leaves us with ["1 green", "12 red", "1 blue" for example
      return {
        red: Number(coloursAndIndex['red']?.count),
        green: Number(coloursAndIndex['green']?.count),
        blue: Number(coloursAndIndex['blue']?.count)
      };
    });
    return rounds;
  });

  return games;
}

const parsedInput = parseInput(rawInput);
const possibleGames = newRound(parsedInput);

// part one answer:
console.log(addUpGameIds(possibleGames));

// part two answer:
const gamePowerTotal = addUpGamePowers(largestHandTracker);
console.log(gamePowerTotal);
