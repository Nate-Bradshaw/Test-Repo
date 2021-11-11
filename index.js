//console.log("'ello wurld");

function Transposition(keys, transposition_amount){
    out = keys + transposition_amount;
    return(out);
}

//get list of notes (for now input directly into the code)
let notes = [11, 7, 2, 3, 2];
console.log(notes);

notes.sort(function(a, b){return a-b});
console.log(notes);

let uniqueNotes = [...new Set(notes)];
notes = uniqueNotes;
console.log(notes);


//pop() removes last, shift() removes first, Math.abs() to negative to pos
let arLength = notes.length;
//get first and last values, compare distance (temp arr?) and repeat foreach combo
for (let i = 0; i < arLength; i++) {
    // Runs arLength times, with values of i 0 through 4.
    let bestDifference = 13; //bigger than any dif could be
    let tempNotes = notes;
    //let outputNotes = tempNotes; //put elsware? (methinks after the itteration)
    for (let j = 0; j < i; j++){
        let tempInt = tempNotes.shift(j);
        tempNotes.push(tempInt);
    }
    let tempTempNotes = tempNotes;
    let start = tempNotes.pop();
    let end = tempNotes.shift();
    let tempDifference = end - start; //this is wrong, the diffence loops around
    if (tempDifference < 0){
        tempDifference = Math.abs(tempDifference);
    }
    if (tempDifference < bestDifference){
        bestDiffernce = tempDifference;
        bestNotes = tempTempNotes; //not outputting anything idk why, fix
    }
    //add tiebreaker statement
}
console.log(bestNotes, bestDiffernce);

//2  11   9
//11 7    4 not -4
//(either in 0-11 form or convert)
//normal form (remove duplicates, order and find smallest difference between first and last)
//invert, find prime form (order and find smallest difference between first and last)
//compare both, find smallest difference
