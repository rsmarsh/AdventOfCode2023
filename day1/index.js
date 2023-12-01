
const rawData = [/* Enter the raw data here */]

const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
]


// receives up to a 5 letter string potentially containing a number word
const checkWordMatch = (str) => {
    
   for (let wordIndex = 0; wordIndex < numberWords.length; wordIndex++) {
     if (str.includes(numberWords[wordIndex])) {
        // plus 1 because "one" is array index 0, so make it 1
        // string because it's easier to smush together into a single number later
       if (str.indexOf(numberWords[wordIndex]) == 0) {     
         return String(wordIndex+1);
       } 
     }
   }
  
  return false;
}

const getFirstDigit = (str, reversing) => {
  if (reversing) {
    str = str.split('').reverse().join('');
  }
  for (let char = 0; char < str.length; char++) {
    const nextChar = parseInt(str.charAt(char));
    const potentialWordStr = reversing ? 
      str.substring(char, char-5).split('').reverse().join('')
      :
      str.substring(char, char+5) 
 
    
    const wordString = checkWordMatch(potentialWordStr);
    
    if (wordString) {
      return wordString;
    }
    if (isNaN(nextChar)) {
       continue
    } else  {
      // return the string number so it's easier to smush together into one
      return str.charAt(char)
    }
   
  }
} 


let total = 0;

for (let line = 0; line < rawData.length; line++) {
  const dataString = rawData[line];
  const digit1 = getFirstDigit(dataString);
  const digit2 = getFirstDigit(dataString, true)

  const number = parseInt(`${digit1}${digit2}`)
  total+=number
  
}

console.log("total is ")
console.log(total)