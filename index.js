function Filter(input){
    return input > -1
}

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

function TieBreak(bestNotes, duplicates, length){
    notesLength = length.push();
    console.log(notesLength);
    for (let i = 0; i < duplicates+1; i++){
        //new code to split based on how many tiebreakers there are
        tempNotes = bestNotes.slice(notesLength * i, notesLength * (i+1));
        storedDifference = 13;

        tempPop = tempNotes.pop();
        penultimate = tempNotes.pop();
        tempNotes.push(penultimate);
        tempNotes.push(tempPop);
        start = tempNotes.shift();
        tempNotes.unshift(start);
        console.log(start, penultimate, "1st and penultimate");

        normalForm = [];
        differnce = FindDifference(start, penultimate); //start and penultimate note to compare
        if (differnce < storedDifference && differnce != storedDifference){
            storedDifference = differnce;
            normalForm = normalForm.concat(tempNotes);
            duplication++;
        }    
        //if there is ANOTHER tie breaker, the lowest starting number is used
    }
    //console.log(normalForm);
    if (duplication > 1){
        //get first note and compare for FINAL winner;
    }

    //return finalNotes; //endpoint
}

function NormalForm(notes){
    notes.sort(function(a, b){return a-b});
    console.log(notes, "sorted list");
    
    uniqueNotes = [...new Set(notes)];
    notes = uniqueNotes;
    console.log(notes, "sorted list with repeats removed");
    
    //pop() removes last, shift() removes first, Math.abs() to negative to pos
    arLength = notes.length;
    storedDifference = 13;
    storedNotes = [];
    duplication = -1; //-1 out means code has gone wrong (not anymore)
    //let tempNotes = notes;
    
    //get first and last values, compare distance (temp arr?) and repeat foreach combo
    for (let i = 0; i < arLength; i++) {
        tempNotes = notes;
    
        tempInt = tempNotes.shift(i);
        tempNotes.push(tempInt);
        console.log(tempNotes)
    
        end = tempNotes.pop();
        tempNotes.push(end);
        start = tempNotes.shift();
        tempNotes.unshift(start);
        //console.log(start, end, "1st and last");
        //console.log(tempNotes, "reconstructed");

        differnce = FindDifference(start, end); //works now

        if(differnce <= storedDifference){
            storedNotes = tempNotes.filter(Filter);
            //storedNotes = tempNotes; //THIS IS TRIGGERING OUTSIDE OF THE IF STATEMENT
            storedDifference = differnce;
            console.log("moo");
        }

        console.log(differnce, "diff"); 

        console.log(storedDifference, "stored diff");
        console.log(storedNotes, "stored notes");

        console.log("");
    } 
    console.log(storedDifference, "difference", storedNotes, "notes", duplication, "dupe");
    //normalForm = TieBreak(storedNotes, duplication, uniqueNotes);
}
//get list of notes (for now input directly into the code)
let notes = [11, 7, 2, 3, 2];
console.log(notes, "start list");

normalFormFinal = NormalForm(notes);


//console.log(debugList);
//console.log(bestNotes, bestDiffernce);

//diff counting up so 7 >> 3 isnt 4 its 8 as 7-8-9-10-11-0-1-2-3 is 8 steps. itteration ofc
//(either in 0-11 form or convert)
//normal form (remove duplicates, order and find smallest difference between first and last)
//invert, find prime form (order and find smallest difference between first and last)
//compare both, find smallest difference
