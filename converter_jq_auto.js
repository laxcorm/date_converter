//WITHOUT REGEXP CHECK OF MANUAL INPUT
let dateTime = luxon.DateTime;
let now = dateTime.now();

let year = now.year;
let month = now.month;
let day = now.day;
let week = now.weekNumber;
let ordinal = now.ordinal;
let weekDay = now.weekday;

let data = new Map([
    ['year', year],
    ['month', month],
    ['day', day],
    ['ordinal', ordinal]
]);

let months = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };
let weekDays = {1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday"};


$("input[name='year']").val(year);
$("input[name='month']").val(months[month]);
$("input[name='day']").val(day);
$("input[name='week']").val(week);
$("input[name='weekDay']").val(weekDays[weekDay]);
$("input[name='ordinal']").val(ordinal);



function converter(key, data) {
    if (key == 'ordinal') {

        let year = data.get('year');
        let ord = data.get('ordinal');
        const ordinalObj = dateTime.fromObject({ year: year, ordinal: ord });
        let month = ordinalObj.month;
        data.set('month', month);
        $("input[name='month']").val(months[month]);
        let day = ordinalObj.day;
        data.set('day', day);
        $("input[name='day']").val(day);
        let week = dateTime.local(year, month, day).weekNumber;//luxon.DateTime
        $("input[name='week']").val(week);
        // data.set('ordinal', ordinal);        
    }
    if (key != 'ordinal') {
        let month = data.get('month');
        $("input[name='month']").val(months[month]);
        // if(dateTime.local(data.get('year'), month).daysInMonth < data.get('day')){
        //     data.set('day', 1);
        //     $("input[name='day']").val(data.get('day'));
        // }
        let timeDate = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        data.set('ordinal', timeDate.ordinal);
        $("input[name='ordinal']").val(timeDate.ordinal);
        $("input[name='week']").val(timeDate.weekNumber);
    }
    let weekDay = dateTime.local(fromInput('year'), fromInput('month'), fromInput('day')).weekday;
    $("input[name='weekDay']").val(weekDays[weekDay]);
}

function checker() {
    data.forEach(
        function (value, key) {
            let input = fromInput(key);
            if (value != input) {
                if (isNaN(input) || !Number.isInteger(input)) {
                    $("input[name='" + key + "']").val(value);
                    return;
                }
                value = switcher(key, input);
                if (value != input) {
                    if(Array.isArray(value)){
                        let val = value;
                        value = val[0];
                        let daysInMonth = val[1];
                        $("input[name='day']").val(daysInMonth);
                    }
                    $("input[name='" + key + "']").val(value);
                }
                data.set(key, value);
                converter(key, data);
            }
        });
}

setInterval(checker, 500);
/*
function switchYear(direction) {
    let year = fromInput("year");
    if (direction == "+") {
        $("input[name='year']").val(++year);
        $("input[name='ordinal']").val(1);
    }
    if (direction == "-") {
        $("input[name='year']").val(--year);
        $("input[name='ordinal']").val(dateTime.local(year).daysInYear);
    }
}
*/
/* 
function dateInForm() {
    let year = Number($("input[name='year']").val());
    let month = $("input[name='month']").val();
    month = Number(Object.keys(months).find(key => months[key] === month));
    let day = Number($("input[name='day']").val());
    let ordinal = Number($("input[name='ordinal']").val());
    let date = new Map([
        ['year', year],
        ['month', month],
        ['day', day],
        ['ordinal', ordinal]
    ]);
    return date;
}
 */
/* function fromInput(className) {
    let value;
    if (className == "month") {
        let month = $("input[name='month']").val();
         value = Number(Object.keys(months).find(key => months[key] === month));
    }
    else {
      value = Number($("input[name='" + className + "']").val());
    }
    return value;
} */




function fromInput(className) {
    let value = $("input[name='" + className + "']").val();
    if (className == "month") {
        value = Number(Object.keys(months).find(key => months[key] === value));
    }
      return Number(value);
}

function switcher(className, value = 0) {
    if (value == 0 || value < 0) {
        // if(className == "month"){
        //     value = 12;
        // }
        // if(className == "day"){
        //     value = dateTime.local(fromInput("year"), fromInput("month")).daysInMonth;
        // }
        // if(className == "ordinal"){
        //     value = dateTime.local(fromInput("year")).daysInYear;
        // }
        switch (className) {
            case "year":
                value = data.get('year');
                break;
            case "month":
                value = 12;
                break;
            case "day":
                value = dateTime.local(fromInput("year"), fromInput("month")).daysInMonth;
                break;
            case "ordinal":
                value = dateTime.local(fromInput("year")).daysInYear;
                break;
        }
    }
    if ((value > 12 && className == "month") ||
        (value > dateTime.local(fromInput("year"), fromInput("month")).daysInMonth && className == "day") ||
        (value > dateTime.local(fromInput("year")).daysInYear && className == "ordinal")) {
        value = 1;
    }
    if(dateTime.local(fromInput("year"), fromInput("month")).daysInMonth < fromInput("day") && className != "day"){
      let  daysNumber = dateTime.local(fromInput("year"), fromInput("month")).daysInMonth;
        value = [ value, daysNumber ];
    }
    return value;
}

$("button").on("click", function () {
    let className = $(this).attr("class");
    let rgx = /[a-z]+/;
    className = className.match(rgx)[0];
    let value = fromInput(className);
    let direction = $(this).text();
    
    if(direction == "-"){
        --value;
       value =  (value == 0) ? switcher(className) : value;
    }else{
        ++value;
        value = switcher(className, value);
    }
    if(Array.isArray(value)){
       let val = value;
        value = val[0];
       let daysInMonth = val[1];
       $("input[name='day']").val(daysInMonth);
    }
    let input = $("input[name='" + className + "']");
    (className != "month") ? input.val(value) : input.val(months[value]);
});