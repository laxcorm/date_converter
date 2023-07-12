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

//watchInput.data = data;

document.querySelector("input[name='year']").value = year;
// document.querySelector("#month").innerHTML = options;
document.querySelector(`option[id='${month}']`).setAttribute("selected", "");
document.querySelector("input[name='day']").value = day;
document.querySelector("#week").innerHTML = week;
document.querySelector("input[name='ordinal']").value = ordinal;
//////////////////////////////////////////////

function watchInput() {

    watchInput.data.forEach(
    
        function (value, key) {
            let inval = document.querySelector(`[name='${key}']`).value;
            inval = Number(inval);
            if (value != inval) {
                watchInput.data.set(key, inval);
                converter(key, watchInput.data);
            }
        }
    );
}

 function converter(key, data) {
    if(key == 'ordinal'){
        
        // let date =  luxon.DateTime.dateFromDay(data.get('year'),data.get('ordinal'));

        let year = data.get('year');
        // let ord = document.querySelector("input[name='ordinal']").value;
        let ord = data.get('ordinal');
        const dym = dateTime.fromObject({ year: year, ordinal: ord });
        let month = dym.month;
        document.querySelector("option[selected]").removeAttribute("selected");
        document.querySelector(`option[id='${month}']`).setAttribute("selected", "");
        data.set('month', month);

        let day = dym.day;
        document.querySelector("input[name='day']").value = day;
        data.set('day', day);
        
        let week = dateTime.local(data.get('year'), month, day).weekNumber;//luxon.DateTime
        document.querySelector("#week").innerHTML = week;
        // data.set('ordinal', ordinal);
        
    }
    if (key != 'ordinal') {
        let month = data.get('month');
        document.querySelector("option[selected]").removeAttribute("selected");
        document.querySelector(`option[id='${month}']`).setAttribute("selected", "");

        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        data.set('ordinal', dtm.ordinal);
        document.querySelector("input[name='ordinal']").value = dtm.ordinal;
        document.querySelector("#week").innerHTML = dtm.weekNumber;
    }
      
}
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