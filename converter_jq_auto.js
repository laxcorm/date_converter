let dateTime = luxon.DateTime;
let now = dateTime.now();

let year = now.year;
let month = now.month;
let day = now.day;
let week = now.weekNumber;
let ordinal = now.ordinal;

let data = new Map([
    ['year', year],
    ['month', month],
    ['day', day],
    ['ordinal', ordinal]
]);

let months = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };

$("input[name='year']").val(year);
$("input[name='month']").val(months[month]);
$("input[name='day']").val(day);
$("input[name='week']").val(week);
$("input[name='ordinal']").val(ordinal);

function converter(key, data) {
    if (key == 'ordinal') {

        let year = data.get('year');
        let ord = data.get('ordinal');
        const dym = dateTime.fromObject({ year: year, ordinal: ord });
        let month = dym.month;
        data.set('month', month);
        $("input[name='month']").val(months[month]);
        let day = dym.day;
        data.set('day', day);
        $("input[name='day']").val(day);
        let week = dateTime.local(year, month, day).weekNumber;//luxon.DateTime
        $("input[name='week']").val(week);
        // data.set('ordinal', ordinal);        
    }
    if (key != 'ordinal') {
        let month = data.get('month');
        $("input[name='month']").val(months[month]);
        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        data.set('ordinal', dtm.ordinal);
        $("input[name='ordinal']").val(dtm.ordinal);
        $("input[name='week']").val(dtm.weekNumber);
    }
}



function checker() {
    data.forEach(
        function (value, key) {
            if (value != dateInForm().get(key)) {
                data.set(key, dateInForm().get(key));
                converter(key, data);
            }
        });
}

setInterval(checker, 500);

function switchYear(direction) {
    let year = dateInForm().get("year");
    if (direction == "+") {
        $("input[name='year']").val(++year);
        $("input[name='ordinal']").val(1);
    }
    if (direction == "-") {
        $("input[name='year']").val(--year);
        $("input[name='ordinal']").val(dateTime.local(year).daysInYear);
    }
}

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

function switcher(className,value = 0){
    if (value == 0) {
        // if(className == "month"){
        //     value = 12;
        // }
        // if(className == "day"){
        //     value = dateTime.local(dateInForm().get("year"), dateInForm().get("month")).daysInMonth;
        // }
        // if(className == "ordinal"){
        //     value = dateTime.local(dateInForm().get("year")).daysInYear;
        // }
        switch (className) {
            case "month":
                value = 12;
                break;
            case "day":
                value = dateTime.local(dateInForm().get("year"), dateInForm().get("month")).daysInMonth;
                break;
            case "ordinal":
                value = dateTime.local(dateInForm().get("year")).daysInYear;
                break;
        }
    }
    else {
        ++value;
        switch (className) {
            case "month":
                (value <= 12) ?? (value = 1);
                break;
            case "day":
                (value <= dateTime.local(dateInForm().get("year"), dateInForm().get("month")).daysInMonth) ?? (value = 1);
                break;
            case "ordinal":
                (value <= dateTime.local(dateInForm().get("year")).daysInYear) ?? (value = 1);
                break;
        }
    }
    return value;
}

$("button").on("click", function () {
    let className = $(this).attr("class");
    let rgx = /[a-z]+/;
    className = className.match(rgx)[0];
    let value = dateInForm().get(className);
    let direction = $(this).text();
    if(direction == "-"){
        --value;
       value =  (value == 0) ? switcher(className) : value;
    }else{
        value = switcher(className, value);
    }
    let input = $("input[name='" + className + "']");
    (className != "month") ? input.val(value) : input.val(months[value]);
});