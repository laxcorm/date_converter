let nmb = 32;
let years = /^([1][9][0-9][0-9]|[2][0-1][0-9][0-9]|2200)$/;
let days = /^([1-9]|[1-9][0-9]|[1-3][0-6][0-7])$/;
let months = /^([1-9]|1[0-2])$/;
let patternx = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
let easy = /^([1-9])$/;
// alert(years.test(nmb));


let regExpRange = {
    year: /^([1][9][0-9][0-9]|[2][0-1][0-9][0-9]|2200)$/,
    day:/^([1-9]|[1-2][0-9]|3[0-1])$/,
    ordinal:/^([1-9]|[1-9][0-9]|[1-3][0-6][0-7])$/,
};

let accept = /\d+/;

let nx = '0xFFccdf';
let wrd = "fjdkfjkd";


let reg = /^([^A-Za-z])$|([0-9])/;

let rgx = /^\d{1,2}$/;

let yearAcc = /^1800-2200$/;

let str = yearAcc.test(prompt("Pleae fill in"));

alert(str);
