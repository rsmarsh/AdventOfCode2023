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

// get the winning amount from a single card
const getCardPrize = card => {
  let prize = 0

  card.cardNumbers.forEach(number => {
    if (card.winningNumbers.includes(number)) {
      // first get a point, then double each match after
      prize = prize ? prize * 2 : prize + 1
    }
  })

  return prize
}

const prizes = cardArray.map(card => getCardPrize(card))
const totalWinnings = prizes.reduce((total, prize) => total + prize, 0)

console.log(totalWinnings)
