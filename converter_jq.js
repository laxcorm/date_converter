let dateTime = luxon.DateTime;
let now = dateTime.now();

function nowInput() {
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
}

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

//watchInput.data = data;

// document.querySelector("input[name='year']").value = year;
// // document.querySelector("#month").innerHTML = options;
// document.querySelector(`option[id='${month}']`).setAttribute("selected", "");
// document.querySelector("input[name='day']").value = day;
// document.querySelector("#week").innerHTML = week;
// document.querySelector("input[name='ordinal']").value = ordinal;
//////////////////////////////////////////////



 function converter(key, data) {
    if(key == 'ordinal'){
        
        // let date =  luxon.DateTime.dateFromDay(data.get('year'),data.get('ordinal'));

        let year = data.get('year');
        // let ord = document.querySelector("input[name='ordinal']").value;
        let ord = data.get('ordinal');
        const dym = dateTime.fromObject({ year: year, ordinal: ord });
        let month = dym.month;
        $("select option:selected").removeAttr("selected");
        $('select option[id="'+ month +'"]').prop('selected', true);
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
        $('select option[id="' + month +' "]').prop('selected', true);

        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        data.set('ordinal', dtm.ordinal);
        $("input[name='ordinal']").val(dtm.ordinal);
        $("#week").text(dtm.weekNumber);
    }
}

/* 
setInterval(function () {
    data.forEach(
        function (value, key) {
            let inval = document.querySelector(`[name='${key}']`).value;
            inval = Number(inval);
            if (value != inval) {
                data.set(key, inval);
                converter(key, data);
            }
        }
    )
}, 500);
 */
//MAIN FUNCTION
// function compare(inval, key) {
//     if (key == 'ordinal') {
//         if (dateTime.local(data.get('year')).daysInYear < inval) {
//             inval = dateTime.local(year).daysInYear;
//             $("input[name='ordinal']").val(inval);

//         }
//     }
//     if (key == 'day') {
//         if (dateTime.local(data.get('year'), data.get('month')).daysInMonth < inval) {
//             inval = dateTime.local(data.get('year'), data.get('month')).daysInMonth;
//             $("input[name='day']").val(inval);
//         }
//     }
//     if (1 > inval) {
//         inval = 1;
//         $("input[name='" + key + "']").val(inval);
//     }
// }

/* 
setInterval(function () {
    data.forEach(
        function (value, key) {
            let inval = $("[name='" + key + "']").val();
            inval = Number(inval);
            if (value != inval) {
                data.set(key, inval);
                converter(key, data);
            }
        }
    )
}, 500);
 */


function checker(data) {
    data.forEach(
        function (value, key) {
            let inval = $("[name='" + key + "']").val();
            inval = Number(inval);
            if (isNaN(inval)) {
                nowInput();
            }
            if (value != inval) {
                // compare(inval, key);
                data.set(key, inval);
                converter(key, data);
            }
        });
}

setInterval(checker, 500, [data]);





/* setInterval(
    $.each(data, function (key, value) {
        let inval = $("[name='" + key + "']").val();
        inval = Number(inval);
        if (value != inval) {
            data.set(key, inval);
            converter(key, data);
        }
    }), 500); */



$(".ordinal").on("click", function () {
  
    let value = $("input[name='" + "ordinal" + "']").val();
    if (text == "+") { $("input[name='" + "ordinal" + "']").val(++value); }
    if (text == "-") { $("input[name='" + "ordinal" + "']").val(--value); }

});


/* $("button").mousedown(
    function () {
        let ids = $(this).attr("id");
        let text = $(this).text();
        let value = $("input[name='" + ids + "']").val();
        if (text == "+") { $("input[name='" + ids + "']").val(++value); }
        if (text == "-") { $("input[name='" + ids + "']").val(--value); }

    }
); */