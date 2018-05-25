var count1 = 0;
var count2 = 0;
var count3 = 0;
var countOff = 0;
var pCount1 = 0;
var pCount2 = 0;
var pCount3 = 0;
var offCount = 0;
var p2Count1 = 0;
var p2Count2 = 0;
var p2Count3 = 0;
var p2offCount = 0;
var pOneCorrect = 0;
var pTwoCorrect = 0;
var wins = [];
var picks = [];
var changes = [];
var shows = [];

function getCount() {
    for (var i = 0; i < 1000; i++) {
        var winner = Math.floor(Math.random() * 3);
        wins.push(winner);
        var pick = Math.floor(Math.random() * 3);
        picks.push(pick);
        var pickTwo = changePick(winner, pick);
        changes.push(pickTwo);
        if (winner === pick) {
            pOneCorrect++;
        }
        if (winner === pickTwo) {
            pTwoCorrect++;
        }
        if (winner === 0) {
            count1++;
        }
        else if (winner === 1) {
            count2++;
        }
        else if (winner === 2) {
            count3++;
        }
        else {
            countOff++
        }
        if (pick === 0) {
            pCount1++;
        }
        else if (pick === 1) {
            pCount2++;
        }
        else if (pick === 2) {
            pCount3++;
        }
        else {
            offCount++
        }
        if (pickTwo === 0) {
            p2Count1++;
        }
        else if (pickTwo === 1) {
            p2Count2++;
        }
        else if (pickTwo === 2) {
            p2Count3++;
        }
        else {
            p2offCount++
        }
    }
    document.getElementById("one").innerHTML = count1 / 10 + "%";
    document.getElementById("two").innerHTML = count2 / 10 + "%";
    document.getElementById("three").innerHTML = count3 / 10 + "%";
    document.getElementById("pone").innerHTML = pCount1 / 10 + "%";
    document.getElementById("ptwo").innerHTML = pCount2 / 10 + "%";
    document.getElementById("pthree").innerHTML = pCount3 / 10 + "%";
    document.getElementById("changedOne").innerHTML = p2Count1 / 10 + "%";
    document.getElementById("changedTwo").innerHTML = p2Count2 / 10 + "%";
    document.getElementById("changedThree").innerHTML = p2Count3 / 10 + "%";
    document.getElementById("pick1").innerHTML = pOneCorrect / 10 + "%";
    document.getElementById("pick2").innerHTML = pTwoCorrect / 10 + "%";
}

function changePick(winner, chosen) {
    var secondPick = 0;
    var shown = 2;
    if (chosen === 0) {
        if (winner === 0) {
            secondPick = (Math.floor(Math.random() * 2)) + 1;
            shown = 2 - secondPick;
        }
        else if (winner === 1) {
            shown = 2;
            secondPick = 1;
        }
        else {
            shown = 1;
            secondPick = 2;
        }
    }
    else if (chosen === 2) {
        if (winner === 2) {
            secondPick = Math.floor(Math.random() * 2);
            shown = 1 - secondPick;
        }
        else if (winner === 0) {
            shown = 1;
            secondPick = 0;
        }
        else {
            shown = 0;
            secondPick = 1;
        }
    }
    else { //pick of 1
        if (winner === 1) {
            rando = Math.floor(Math.random() * 2)
            if (rando === 1) {
                secondPick = 2;
                shown = 0;
            }
        }
        else if (winner === 2) {
            shown = 0;
            secondPick = 2;
        }
        else { //winner = 0
            shown = 2;
            secondPick = 0;
        }
    }
    shows.push(shown);
    return secondPick
}