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
    //console.log(differnce, "diff from findDiff")
    return differnce;
}

function TieBreak(bestNotes, duplicates, length){
    notesLength = length.push();
    //console.log(notesLength);
    duplication = 0;
    for (let i = 0; i < duplicates+1; i++){
        //new code to split based on how many tiebreakers there are
        //console.log("");
        tempNotes = bestNotes.slice(notesLength * i, notesLength * (i+1));
        storedDifference = 13;
        //console.log(tempNotes, "tiebreak test");

        tempPop = tempNotes.pop();
        penultimate = tempNotes.pop();
        tempNotes.push(penultimate);
        tempNotes.push(tempPop);
        start = tempNotes.shift();
        tempNotes.unshift(start);
        //console.log(tempNotes, "reconstruct");
        //console.log(start, penultimate, "1st and penultimate");

        normalForm = [];
        differnce = FindDifference(start, penultimate); //start and penultimate note to compare
        //console.log(differnce)
        if (differnce < storedDifference){
            storedDifference = differnce;
            normalForm = tempNotes.filter(Filter);
            //console.log(normalForm, "in if state");
        }
        else if (differnce = storedDifference){
            normalForm.concat(tempNotes);
            duplication++;
        }
    }
    //console.log(normalForm);

    if (duplication > 0){ //may only work for 2 same
        //if there is ANOTHER tie breaker, the lowest starting number is used
        if (normalForm.shift() > normalForm.shift(notesLength)){
            return normalForm.slice(0, notesLength);
        }
        else{
            return normalForm.slice(notesLength, notesLength*2)
        }
    }
    else{
        return normalForm;
    }
    //console.log(normalForm);
    //return finalNotes; //endpoint
}

function NormalForm(notes){
    notes.sort(function(a, b){return a-b});
    //console.log(notes, "sorted list");
    
    uniqueNotes = [...new Set(notes)];
    notes = uniqueNotes;
    //console.log(notes, "sorted list with repeats removed");
    
    //pop() removes last, shift() removes first, Math.abs() to negative to pos
    arLength = notes.length;
    storedDifference = 13;
    storedNotes = [];
    duplication = 0;
    //let tempNotes = notes;
    
    //get first and last values, compare distance (temp arr?) and repeat foreach combo
    for (let i = 0; i < arLength; i++) {
        tempNotes = notes;
    
        tempInt = tempNotes.shift(i);
        tempNotes.push(tempInt);
        //console.log(tempNotes)
    
        end = tempNotes.pop();
        tempNotes.push(end);
        start = tempNotes.shift();
        tempNotes.unshift(start);
        //console.log(start, end, "1st and last");
        //console.log(tempNotes, "reconstructed");

        differnce = FindDifference(start, end); //works now

        if(differnce < storedDifference){
            storedNotes = tempNotes.filter(Filter);
            //storedNotes = tempNotes; //THIS IS TRIGGERING OUTSIDE OF THE IF STATEMENT
            storedDifference = differnce;
            //console.log("moo");
        }
        else if (differnce == storedDifference){
            storedNotes = storedNotes.concat(tempNotes);
            duplication++
        }

        //console.log(differnce, "diff"); 

        //console.log(storedDifference, "stored diff");
        //console.log(storedNotes, "stored notes");

        //console.log("");
    } 
    //console.log(storedDifference, "difference", storedNotes, "notes", duplication, "dupe");
    if (duplication > 0){
        tie = true;
        normalForm = TieBreak(storedNotes, duplication, uniqueNotes);
        return normalForm;
    }
    else{
        normalForm = storedNotes;
        return normalForm;
    }
}

function Transpose(notes, setFirst){ //setfirst will allow transposing to different first notes but within the 0-11 system
    transposedNotes = [];
    tempNotes = notes;
    nLength = tempNotes.length;
    first = tempNotes.shift();
    transposeAmount = (setFirst + 12) - first; //this line may not work for other tranposes exept for 0
    //console.log(transposeAmount, "transpose amount")
    //first = 0;
    tempNotes.unshift(first);
    for (let i = 0; i < nLength; i++){
        tempInt = tempNotes.shift(i);
        //console.log(tempInt, "taken from pos", i);
        tempInt = tempInt + transposeAmount;
        //console.log(tempInt, "trasposed");
        if (tempInt > 11){
            tempInt = tempInt - 12;
            //console.log(tempInt, "moo");
        }
        transposedNotes.push(tempInt);
    }
    //console.log(transposedNotes, "transposed")
    return transposedNotes;
}

function Invert(notes){
    //tempNotes = [];
    tempNotes = notes;
    invertedNotes = [];
    nLength = tempNotes.length;
    first = tempNotes.shift()
    tempNotes.unshift(first);
    //console.log(tempNotes);
    invertedNotes.push(first);
    num1 = tempNotes.shift();
    invertedNum = 0;
    for (let i = 0; i < nLength - 1; i++){
        num2 = tempNotes.shift();
        diff = FindDifference(num1, num2); //how far the diff from the last note goes up from instead goes down

        noteInput = diff;
        noteInput = invertedNum - noteInput;
        //console.log(noteInput, "2");

        if (noteInput < 0){
            noteInput = Math.abs(noteInput);
            noteInput = 12 - noteInput;
        }
        //console.log(noteInput, "3");

        invertedNum = noteInput;
        num1 = num2; //for the next loop
        invertedNotes.push(noteInput)
    }
    ascendingInvertedNotes = [];
    for (let i = 0; i < nLength; i++){
        a = invertedNotes.pop();
        ascendingInvertedNotes.push(a);
    }
    return ascendingInvertedNotes;
}

//get list of notes (for now input directly into the code)
let notes = [11, 7, 2, 3, 2];
let tie = false;
console.log(notes, "start list");

normalFormFinal = NormalForm(notes);
console.log(normalFormFinal, "final");

let transposed = Transpose(normalFormFinal, 0);
console.log(transposed, "transposed to 0");

let finalComparison = transposed; //THIS IS REASINGONG FOR NO REASON DUE TO
finalComparison = finalComparison;
console.log(finalComparison, "test1");

primeFormInverted = Invert(transposed);
console.log(primeFormInverted, "inverted notes");//THIS FOR NO REASON????

if (tie = true){
    primeFormInverted = NormalForm(primeFormInverted);//if there was a tie in the normal form
    console.log(primeFormInverted, "was a normal form tie, so normalised inverted");
}

console.log(finalComparison, "test2");
//finalComparison = finalComparison.concat(primeFormInverted);
console.log(finalComparison);
final = TieBreak(finalComparison, 2, primeFormInverted); //last one is for length
console.log(final, "final");
//prime form: transpose first note to 0 and rest by same amount, invert by subtracting current value from 12 and then finding shortest distance (like normal form)


//console.log(debugList);
//console.log(bestNotes, bestDiffernce);

//diff counting up so 7 >> 3 isnt 4 its 8 as 7-8-9-10-11-0-1-2-3 is 8 steps. itteration ofc
//(either in 0-11 form or convert)
//normal form (remove duplicates, order and find smallest difference between first and last)
//invert, find prime form (order and find smallest difference between first and last)
//compare both, find smallest difference
