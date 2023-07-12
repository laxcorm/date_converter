let dateTime = luxon.DateTime;
let now = dateTime.now();
let year = now.year;

let month = now.month;
let day = now.day;
let week = now.weekNumber;
let ordinal = now.ordinal;

document.querySelector("input[name='year']").value = year;
// document.querySelector("#month").innerHTML = options;
document.querySelector(`option[id='${month}']`).setAttribute("selected", "");
document.querySelector("input[name='day']").value = day;
document.querySelector("#week").innerHTML = week;
document.querySelector("input[name='ordinal']").value = ordinal;

dateTime = null;
now = null;

//////////////////////////////////////////////
function watchInput() {

    watchInput.data.forEach(

        function (value, key) {
            let inval = document.querySelector(`[name='${key}']`).value;//как получает значение из option
            inval = Number(inval);
            if (value != inval) {

                alert(key + " " + value + " " + inval)

                watchInput.data.set(key, inval);
                converter(key, watchInput.data);
            }
        }
    );
}

function converter(key, data) {
    let dateTime = luxon.DateTime;
    if (key == 'ordinal') {
        // let date =  luxon.DateTime.dateFromDay(data.get('year'),data.get('ordinal'));
        let ord = document.querySelector("input[name='ordinal']").value;
        ord = Number(ord);
        data.set('ordinal', ord);
        let date = new Date(data.get('year'), 0);
        let dt = new Date(date.setDate(data.get('ordinal')));
        date = null;
        let month = dt.getMonth();
   month = Number(month);
      
        document.querySelector("option[selected]").removeAttribute("selected");
        document.querySelector(`option[id='${month}']`).setAttribute("selected", "");

        let day = dt.getDate();
        day = Number(day);
        document.querySelector("input[name='day']").value = day;
        dt = null;
        // let year = dt.getFullYear();
        let week = dateTime.local(data.get('year'), month, day).weekNumber;//luxon.DateTime

        document.querySelector("#week").innerHTML = week;
        data.set('month', month);
        data.set('day', day);
    }
    if (key == 'year') {
        let year = document.querySelector("input[name='year']").value;
        year = Number(year);
        data.set('year', year);
        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        let month = dtm.month;
        document.querySelector("option[selected]").removeAttribute("selected");
        document.querySelector(`option[id='${month}']`).setAttribute("selected", "");
        let day = dtm.day;
        document.querySelector("input[name='day']").value = day;
        let weekNumber = dtm.weekNumber;
        document.querySelector("#week").innerHTML = weekNumber;
        let ordinal = dtm.ordinal;
        data.set('ordinal', ordinal);
        document.querySelector("input[name='ordinal']").value = dtm.ordinal;
    }
    if (key == 'month') {
        let month = document.querySelector("select[name='month']").value;
        month = Number(month);
        data.set('month', month);
        document.querySelector("option[selected]").removeAttribute("selected");
        document.querySelector(`option[id='${month}']`).setAttribute("selected", "");
        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        let day = dtm.day;
        document.querySelector("input[name='day']").value = day;
        let weekNumber = dtm.weekNumber;
        document.querySelector("#week").innerHTML = weekNumber;
        let ordinal = dtm.ordinal;
        document.querySelector("input[name='ordinal']").value = dtm.ordinal;
    }
    if (key == 'day') {
        let dt = document.querySelector("input[name='day']").value;
        dt = Number(dt);
        data.set('day', dt);
        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        let weekNumber = dtm.weekNumber;
        document.querySelector("#week").innerHTML = weekNumber;
        let ordinal = dtm.ordinal;
        document.querySelector("input[name='ordinal']").value = dtm.ordinal;
    }
    dateTime = null;
}
let data = new Map([
    ['year', year],
    ['month', month],
    ['day', day],
    ['ordinal', ordinal]
]);
watchInput.data = data;
setInterval(watchInput, 500);