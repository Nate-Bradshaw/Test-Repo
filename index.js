//console.log("'ello wurld");
/*
function Transposition(keys, transposition_amount){
    out = keys + transposition_amount;
    return(out);
}
*/



function FindDifference(start, end){ //returns differnce
    differnce = 0;
    start1 = start;
    end1 = end;
    //console.log(start1, end1);

    while (start1 != end1){
        start1 = start1 + 1;
        differnce = differnce +1;
        if (start1 == 12){
            start1 = 0;
        }
    }
    return differnce;
}

//get list of notes (for now input directly into the code)
let notes = [11, 7, 2, 3, 2];
console.log(notes, "start list");

notes.sort(function(a, b){return a-b});
console.log(notes, "sorted list");

let uniqueNotes = [...new Set(notes)];
notes = uniqueNotes;
console.log(notes, "sorted list with repeats removed");


//pop() removes last, shift() removes first, Math.abs() to negative to pos
let arLength = notes.length;
//let tempNotes = notes;

//get first and last values, compare distance (temp arr?) and repeat foreach combo
for (let i = 0; i < arLength; i++) {
    bestDifference = 13; //bigger than any dif could be, so 13 = error msg :)
    tempNotes = notes;

    tempInt = tempNotes.shift(i);
    tempNotes.push(tempInt);
    console.log(tempNotes)

    end = tempNotes.pop();
    tempNotes.push(end);
    start = tempNotes.shift();
    tempNotes.unshift(start);
    console.log(start, end, "1st and last");
    
    /*
    let tempDifference = end - start; //this is wrong, the diffence loops around
    if (tempDifference < 0){
        tempDifference = Math.abs(tempDifference);
    }
    */
    differnce = FindDifference(start, end); //works now

    console.log(differnce, "diff"); 

    /*
    if (tempDifference < bestDifference){
        bestDiffernce = tempDifference;
        bestNotes = tempTempNotes; //not outputting anything idk why, fix
    }
    //add tiebreaker statement
    */
}
//console.log(bestNotes, bestDiffernce);

//diff counting up so 7 >> 3 isnt 4 its 8 as 7-8-9-10-11-0-1-2-3 is 8 steps. itteration ofc
//(either in 0-11 form or convert)
//normal form (remove duplicates, order and find smallest difference between first and last)
//invert, find prime form (order and find smallest difference between first and last)
//compare both, find smallest difference
