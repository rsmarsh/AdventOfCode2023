const input = require('./input.js')

let cardArray = input.split('\n')

cardArray = cardArray.map((rawCard, index) => {
  const winningNumbers = rawCard
    .split('|')[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .filter(strNum => strNum !== '') // filter out those pesky single digit with an extra space vals
    .map(number => Number(number))

  const cardNumbers = rawCard
    .split('|')[1]
    .trim()
    .split(' ')
    .filter(strNum => strNum !== '')
    .map(number => Number(number))

  return {
    id: index + 1,
    winningNumbers,
    cardNumbers,
  }
})

// this was the solution, just modify it on the go until we hit the end
let liveCardList = [...cardArray]

// get the winning amount from a single card
const getCardsToAdd = card => {
  const addCards = []

  card.cardNumbers.forEach(number => {
    if (card.winningNumbers.includes(number)) {
      // each win, store the next card ID which you now win
      // card.id is 1 indexed, so 'matches' can be 0 for the first win to end up correct
      liveCardList.push(cardArray[card.id + matches])
    }
  })

  return addCards
}

let currentIndex = 0
while (currentIndex < liveCardList.length) {
  getCardsToAdd(liveCardList[currentIndex])
  currentIndex += 1
}

console.log(totalCardsScanned)
