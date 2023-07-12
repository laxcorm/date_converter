let a = "aaaa";
const nest = document.querySelector("#test");
nest.innerHTML = a;
function recur(letter, nest){

    if(letter == "aaaa"){
        letter = "bbbb";
    }
    else{
        letter = "aaaa";
    }
    nest.innerHTML = letter;
    setTimeout(recur, 1000, letter, nest);
}

recur(a, nest);