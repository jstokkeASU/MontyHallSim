let picks = []; // 0 = optional change, 1 = show goat, 2 = winning option, 4 = selected
let changedWin = 0;
let unchangedWin = 0;
let changedLoss = 0;
let unchangedLoss = 0;


if (localStorage.cWins > 0) {
    changedWin += parseInt(localStorage.cWins);
}
if (localStorage.uWins > 0) {
    unchangedWin += parseInt(localStorage.uWins);
}
if (localStorage.cLoss > 0) {
    changedLoss += parseInt(localStorage.cLoss);
}
if (localStorage.uLoss > 0) {
    unchangedLoss += parseInt(localStorage.uLoss);
}

function getCount() {
    var countOff = 0;
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var pCount1 = 0;
    var pCount2 = 0;
    var pCount3 = 0;
    var p2Count1 = 0;
    var p2Count2 = 0;
    var p2Count3 = 0;
    var offCount = 0;
    var p2offCount = 0;
    var pOneCorrect = 0;
    var pTwoCorrect = 0;

    for (var i = 0; i < 1000; i++) {
        var winner = Math.floor(Math.random() * 3);
        var pick = Math.floor(Math.random() * 3);
        postDoorSelect(pick, winner)
        var pickTwo = picks[0];
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

function playGame(selection) {
    var doorNum = (parseInt(selection));
    var winDoor = Math.floor(Math.random() * 3);
    postDoorSelect(doorNum, winDoor);
    updateDoors(doorNum, winDoor);
    document.getElementById("secondoutput").innerHTML = "Let's look at one of the doors you didn't pick.<br/>  Behind Door Number " + (picks[1] + 1) + " is a goat.  Would you like to change your pick to Door Number " + (picks[0] + 1) + "?";
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
    return secondPick
}

function postDoorSelect(selected, winDoor) {
    picks[2] = winDoor;
    picks[4] = selected;
    // If 1st pick was not correct
    doors = [0, 1, 2];
    var index = doors.indexOf(winDoor);
    doors.splice(index, 1);
    index = doors.indexOf(selected);
    doors.splice(index, 1);
    var opt = winDoor;
    var show = doors[0];
    // If 1st pick was correct
    if (selected === winDoor) {
        rando = Math.floor(Math.random() * 2); // Used to alternate which door is shown
        if (selected === 0) {
            show = 1;
            opt = 2;
        }
        else if (selected === 1) {
            show = 0;
            opt = 2;
        }
        else if (selected === 2) {
            show = 0;
            opt = 1;
        }
        if (rando === 1) {
            temp = show;
            swap = opt;
            show = swap;
            opt = temp;
        }
    }
    picks[0] = opt;
    picks[1] = show;
}

function updateDoors(){
    if (picks[1] === 0) {
        document.getElementById('door1').src = "img/goat.gif";
        document.getElementById('door1').disabled = true;
        // If winner wasn't picked then Change option = winning door
        if (picks[0] === 1 && picks[2] === 1 || picks[4] === 2) {
            fillDoors('door3', 'door2', 3, 2);
            /*document.getElementById('door2').src = "img/change.gif";
            document.getElementById('door2').setAttribute('onclick', 'playerChange(2, picks[2], true)');
            document.getElementById("door3").src = "img/stay.gif";
            document.getElementById('door3').setAttribute('onclick', 'playerChange(3, picks[2], false)');
            */
            return;
        }
        else { //picks[0] ===
            fillDoors('door2', 'door3', 2, 3);
            /*document.getElementById('door3').src = "img/change.gif";
            document.getElementById('door3').setAttribute('onclick', 'playerChange(3, picks[2], true)');
            document.getElementById("door2").src = "img/stay.gif";
            document.getElementById('door2').setAttribute('onclick', 'playerChange(2, picks[2], false)');*/
            return;
        }
    }
    if (picks[1] === 1) {
        document.getElementById("door2").src = "img/goat.gif";
        document.getElementById('door2').disabled = true;
        if (picks[0] === 0) {
            fillDoors('door3', 'door1', 3, 1);/*
            document.getElementById('door1').src = "img/change.gif";
            document.getElementById('door1').setAttribute('onclick', 'playerChange(1, picks[2], true)');
            document.getElementById("door3").src = "img/stay.gif";
            document.getElementById('door3').setAttribute('onclick', 'playerChange(3, picks[2], false)');*/
            return;
        }
        else {
            fillDoors('door1', 'door3', 1, 3);/*
            document.getElementById('door3').src = "img/change.gif";
            document.getElementById('door3').setAttribute('onclick', 'playerChange(3, picks[2], true)');
            document.getElementById("door1").src = "img/stay.gif";
            document.getElementById('door1').setAttribute('onclick', 'playerChange(1, picks[2], false)');*/
            return;
        }
    }
    else {
        document.getElementById("door3").src = "img/goat.gif";
        document.getElementById('door3').disabled = true;
        if (picks[0] === 0) {
            fillDoors('door2', 'door1', 2, 1);/*
            document.getElementById('door1').src = "img/change.gif";
            document.getElementById('door1').setAttribute('onclick', 'playerChange(1, picks[2], true)');
            document.getElementById("door2").src = "img/stay.gif";
            document.getElementById('door2').setAttribute('onclick', 'playerChange(2, picks[2], false)');*/
            return;
        }
        else {
            fillDoors('door1', 'door2', 1, 2);/*
            document.getElementById('door2').src = "img/change.gif";
            document.getElementById('door2').setAttribute('onclick', 'playerChange(2, picks[2], true)');
            document.getElementById("door1").src = "img/stay.gif";
            document.getElementById('door1').setAttribute('onclick', 'playerChange(1, picks[2], false)');*/
            return;
        }
    }
}   
function playerChange(newPick, winPick, changed) {
    document.getElementById('door1').disabled = true;
    document.getElementById('door2').disabled = true;
    document.getElementById('door3').disabled = true;
    winPick = winPick+1;
    if (newPick === winPick) {
        if (newPick === 1) {
            document.getElementById('door1').src = "img/car.gif";
        }
        else if (newPick === 2) {
            document.getElementById('door2').src = "img/car.gif";
        }
        else if (newPick === 3) {
            document.getElementById('door3').src = "img/car.gif";
        }
        document.getElementById("firstoutput").innerHTML = "Congratulations.  Behind door # " + (newPick) + " is a drawing of a car!";
        if (changed == true) {
            changedWin++;
            getWinTotals();
            return;
            
        }
        else {
            unchangedWin++;
            getWinTotals();
        }
        return;
    }
    else {
        if (newPick === 1) {
            document.getElementById('door1').src = "img/goat.gif";
        }
        if (newPick === 2) {
            document.getElementById('door2').src = "img/goat.gif";
        }
        if (newPick === 3) {
            document.getElementById('door3').src = "img/goat.gif";
        }
        document.getElementById("firstoutput").innerHTML = "Sorry.  Behind door # " + (newPick) + " is another drawing of a goat!";
        if (changed == true) {
            changedLoss++;
            getWinTotals();
            return;
        }
        else {
            unchangedLoss++;
            getWinTotals();
        }
        return;
        
    }
}
function getWinTotals() {
    var changedTotal = changedWin+changedLoss;
    if (changedTotal < 1) {
        changedTotal = 1;
    }
    var unchangedTotal = unchangedWin + unchangedLoss;
    if (unchangedTotal < 1) {
        unchangedTotal = 1;
    }
    var changedWP = ((changedWin / changedTotal) * 100).toFixed(2);
    var unchangedWP = ((unchangedWin / unchangedTotal) * 100).toFixed(2);
    document.getElementById("cw").innerHTML = changedWin;
    document.getElementById("cl").innerHTML = changedLoss;
    document.getElementById("cp").innerHTML = changedWP;
    document.getElementById("uw").innerHTML = unchangedWin;
    document.getElementById("ul").innerHTML = unchangedLoss;
    document.getElementById("up").innerHTML = unchangedWP;
    saveScores();
}

function resetGame() {
    document.getElementById('firstoutput').innerHTML = "";
    document.getElementById('secondoutput').innerHTML = "To get started, pick a door below.";
    document.getElementById('door1').src = "img/door1.gif";
    document.getElementById('door1').setAttribute('onclick', 'playGame(0)');
    document.getElementById('door2').src = "img/door2.gif";
    document.getElementById('door2').setAttribute('onclick', 'playGame(1)');
    document.getElementById('door3').src = "img/door3.gif";
    document.getElementById('door3').setAttribute('onclick', 'playGame(2)');
    document.getElementById('door1').disabled = false;
    document.getElementById('door2').disabled = false;
    document.getElementById('door3').disabled = false;
}

function saveScores() {
    localStorage.setItem("cWins", changedWin);
    localStorage.setItem("cLoss", changedLoss);
    localStorage.setItem("uWins", unchangedWin);
    localStorage.setItem("uLoss", unchangedLoss);
    // Checking
    let cw = localStorage.getItem("cWins");
    let cl = localStorage.getItem("cLoss");
    let uw = localStorage.getItem("uWins");
    let ul = localStorage.getItem("uLoss");
    document.getElementById("check").innerHTML = "Storing - CW:" + localStorage.cWins + " CL:" + cl + " UW:" + uw + " UL:" + ul;
}

function clearScores() {
    localStorage.remove("cWins");
    localStorage.remove("cLoss");
    localStorage.remove("uWins");
    localStorage.remove("uLoss");
    changedWin = 0;
    changedLoss = 0;
    unchangedWin = 0;
    unchangedLoss = 0;
}

function hidePage(show, hide) {
    var element1 = document.getElementById(hide);
    var element2 = document.getElementById(show);
    element1.style.display = "none";
    element2.style.display = "block";
    if (show === "pageOne") {
        getCount();
    }
}

function fillDoors(stay, change, sNum, cNum) {
    document.getElementById(change).src = "img/change.gif";
    document.getElementById(change).setAttribute('onclick', 'playerChange('+cNum+', picks[2], true)');
    document.getElementById(stay).src = "img/stay.gif";
    document.getElementById(stay).setAttribute('onclick', 'playerChange('+sNum+', picks[2], false)');
}
