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
$("input[name='year']").val(year);
$('select option[id="' + month + '"]').prop('selected', true);
$("input[name='day']").val(day);
$("#week").append(week);
$("input[name='ordinal']").val(ordinal);


function nowInput() {
    let year = now.year;
    let month = now.month;
    let day = now.day;
    let week = now.weekNumber;
    let ordinal = now.ordinal;

    data.set('year', year);
    data.set('month', month);
    data.set('day', day);
    data.set('ordinal', ordinal);

    $("input[name='year']").val(year);
    $('select option[id="' + month + '"]').prop('selected', true);
    $("input[name='day']").val(day);
    $("#week").html(week);
    $("input[name='ordinal']").val(ordinal);
    return;
}

function converter(key, data) {
    if (key == 'ordinal') {

        // let date =  luxon.DateTime.dateFromDay(data.get('year'),data.get('ordinal'));

        let year = data.get('year');
        // let ord = document.querySelector("input[name='ordinal']").value;
        let ord = data.get('ordinal');
        const dym = dateTime.fromObject({ year: year, ordinal: ord });
        let month = dym.month;
        $("select option:selected").removeAttr("selected");
        $('select option[id="' + month + '"]').prop('selected', true);
        data.set('month', month);
        let day = dym.day;
        $("input[name='day']").val(day);
        data.set('day', day);

        let week = dateTime.local(data.get('year'), month, day).weekNumber;//luxon.DateTime
        $("#week").text(week);
        // data.set('ordinal', ordinal);        
    }
    if (key != 'ordinal') {
        let month = data.get('month');
        $("select option:selected").removeAttr("selected");
        $('select option[id="' + month + ' "]').prop('selected', true);

        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        data.set('ordinal', dtm.ordinal);
        $("input[name='ordinal']").val(dtm.ordinal);
        $("#week").text(dtm.weekNumber);
    }
}

function compare(inval, key) {
    if (isNaN(inval)) {
        nowInput();
        // return;
    }
    if (key == 'ordinal') {
        if (dateTime.local(data.get('year')).daysInYear < inval) {
            inval = dateTime.local(year).daysInYear;
            $("input[name='ordinal']").val(inval);

        }
    }
    if (key == 'day') {
        if (dateTime.local(data.get('year'), data.get('month')).daysInMonth < inval) {
            inval = dateTime.local(data.get('year'), data.get('month')).daysInMonth;
            $("input[name='day']").val(inval);

        }
    }
    if (1 > inval) {
        inval = 1;
        $("input[name='" + key + "']").val(inval);
    }

    return inval;
}

function checker() {
    data.forEach(
        function (value, key) {
            let inval = $("[name='" + key + "']").val();
            inval = Number(inval);

            // inval = compare(inval, key);

            // if (isNaN(inval)) {
            //     nowInput();
            // }
            if (value != inval) {
                data.set(key, inval);
                converter(key, data);
            }
        });
}

setInterval(checker, 500);

/* 
function nextLast(className, value, direction) {
    // if (isNaN(value)) {
    //     nowInput();
    // }
    if (className == 'day') {
        if (dateTime.local(data.get('year'), data.get('month')).daysInMonth == value && direction == "+") {
            value = 1;
            data.set('day', value);
            $("input[name='day']").val(value);
            let month = $("select option:selected").attr("id");
            month++;
            if (month > 12) {
                month = 1;
                let year = $("input[name='year']").val();
                year = Number(year);
                year++;
                data.set('year', year);
                $("input[name='year']").val(year);
            }
            data.set('month', month);
            $("select option:selected").removeAttr("selected");
            $('select option[id="' + month + '"]').prop('selected', true);
            return true;
        }
        if (value == 1 && direction == "-") {
            month = $("select option:selected").attr("id");
            month--;
            if (month < 1) {
                month = 1;
                let year = $("input[name='year']").val();
                year = Number(year);
                year--;
                data.set('year', year);
                $("input[name='year']").val(year);
            }

            data.set('month', month);
            $('select option[id="' + month + '"]').prop('selected', true);
            day = dateTime.local(data.get('year'), data.get('month')).daysInMonth;
            data.set('day', day);
            $("input[name='day']").val(day);
                      return true;
        }

    }
    
}
 */

function dateInForm() {
    let year = Number($("input[name='year']").val());
    let month = Number($("select option:selected").attr("id"));
    let day = Number($("input[name='day']").val());
    let ordinal = Number($("input[name='ordinal']").val());
    let dateInForm = new Map([
        ['year', year],
        ['month', month],
        ['day', day],
        ['ordinal', ordinal]
    ]);
    return dateInForm;
}

function nextLast(className, value, direction) {
    // if (isNaN(value)) {
    //     nowInput();
    // }

    /* let year = dateInForm().get('year');
    let month = dateInForm().get('month');
    let day = dateInForm().get('day');
    let ordinal = dateInForm().get('ordinal'); */
    let inputs = dateInForm();
    let isChanged = false;

    if (className == 'day') {
        if (direction == "-" && value == 1) {
            month--;
            if (month < 1) {
                month = 12;
                year--;
                inputs.set('year', year);
            }
            day = dateTime.local(year, month).daysInMonth;
            inputs.set('month', month);
            inputs.set('day', day);
            isChanged = true;
        }
        if (dateTime.local(year, month).daysInMonth == value && direction == "+") {
            day = 1;
            month++;
            if (month > 12) {
                month = 1;
                ++year;
                inputs.set('year', year);
            }
            inputs.set('month', month);
            inputs.set('day', day);
            isChanged = true;
        }
    }
    if (className == 'month' && direction == "-") {
        if (month == 1) {
            month = 12;
            year--;
            ordinal = dateTime.local(year).daysInYear;
            inputs.set('year', year);
            inputs.set('month', month);
            inputs.set('ordinal', ordinal);
            isChanged = true;
        }
        if (month == 12 && direction == "+") {
            month = 1;
            year++;
            ordinal = dateTime.local(year).daysInYear;
            inputs.set('year', year);
            inputs.set('month', month);
            inputs.set('ordinal', ordinal);
            isChanged = true;
        }
    }
    if (className == 'ordinal') {
        if (ordinal == 1 && direction == "-") {
            year--;
            ordinal = dateTime.local(year).daysInYear;
            inputs.set('year', year);
            inputs.set('ordinal', ordinal);
            isChanged = true;
        }
        if (ordinal == dateTime.local(year).daysInYear && direction == "+") {
            year++;
            ordinal = 1; inputs.set('year', year);
            inputs.set('ordinal', ordinal);
            isChanged = true;
        }
    }
    if (isChanged) {
        let year = inputs.get('year');
        let month = inputs.get('month');
        let day = inputs.get('day');
        let ordinal = inputs.get('ordinal');
        $("input[name='year']").val(year);
        $("select option:selected").removeAttr("selected");
        $('select option[id="' + month + '"]').prop('selected', true);
        $("input[name='day']").val(day);
        $("input[name='ordinal']").val(ordinal);
        return isChanged;
    }
}

$("button").on("click", function () {
    let className = $(this).attr("class");
    let rgx = /[a-z]+/;
    className = className.match(rgx);
    let value = $("input[name='" + className + "']").val();
    let direction = $(this).text();

    if (nextLast(className, value, direction)) { return; }//как выйти из вложенной функции?

    if (direction == "+") { $("input[name='" + className + "']").val(++value); }
    if (direction == "-") { $("input[name='" + className + "']").val(--value); }

});