const input = require('./input.js')
const inputGrid = input.split('\n');

let partNumberSum = 0;

const checkIsSymbol = (char) => {
    // watch out for zeroes
    if (!isNaN(Number(char))) {
        return false;
    }

    if (char === '.') {
        return false;
    }

    return true;
}

// has access to the global inputGrid, to check the 8 surrounding squares for numbers
const findSurroundingInts = (rowNum, pos) => {
    
    const surroundingInts = [];
    for (let rowScan = -1; rowScan <= 1; rowScan++) {
        const rowIndex = rowScan+rowNum;

        if (rowIndex < 0) {
            continue;
        }

        for (let i = -1; i <= 1; i++) {
            const cellIndex = pos+i;
            if (cellIndex < 0) {
                continue;
            }

            const cell = inputGrid[rowIndex]?.[cellIndex];

            
            if (!isNaN(cell)) {

                let numberStartIndex = pos+i;

                // found a number, traverse left until it is no longer a number to find the start
                while (!isNaN(inputGrid[rowIndex][numberStartIndex])) {
                    numberStartIndex -=1;
                }

                // found before the beginning, go forward one to be on the first digit
                numberStartIndex += 1;

                let numberEndIndex = numberStartIndex;

                // now do the same to find the end 
                while (!isNaN(inputGrid[rowIndex][numberEndIndex])) {
                    numberEndIndex += 1;

                }

                // keeping track of the row and indexes helps to get rid of duplicates after
                const foundNumber = {
                    value: Number(inputGrid[rowIndex].substring(numberStartIndex, numberEndIndex)),
                    start: numberStartIndex,
                    end: numberEndIndex,
                    row: rowIndex
                }
                surroundingInts.push(foundNumber)
            }
        }
    }
    return surroundingInts
}

const intDuplicateCheck = {}

// top to bottom, checking through each index per row
for (let row = 0; row < inputGrid.length; row++) {

    // iterate over each entry on this row
    for (let i = 0; i < inputGrid[row].length; i++) {
        if (checkIsSymbol(inputGrid[row][i])) {
            // we found a symbol, so need to check for numbers around it
            const surroundingInts = findSurroundingInts(row, i)            


            // add up the surrounding numbers, and bump up the total count
            surroundingInts.forEach(num => {
                // has this number already been counted? skip it
               
                if (typeof intDuplicateCheck[num.row]?.[num.start] !== 'undefined') {
                    // do nothing, ignore this value
                } else {
                    if (!intDuplicateCheck[num.row]){
                        intDuplicateCheck[num.row] = {}
                    }
                    intDuplicateCheck[num.row][num.start] = num.value //anything, just needs an entry

                    // add it to the total here, unique new number that is adjacent
                    partNumberSum += num.value;
                  
                }
            })

        }
    }
}

console.log("the sum of all parts: ", partNumberSum)