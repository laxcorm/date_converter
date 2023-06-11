let dateTime = luxon.DateTime;
let now = dateTime.now();
let year = now.year;

let month = now.month;
let day = now.day;
let week = now.weekNumber;
let ordinal = now.ordinal;

document.querySelector("input[name='year']").value = year;
// document.querySelector("#month").innerHTML = options;
document.querySelector(`option[value='${month}']`).setAttribute("selected", "");
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
    if (key != 'ordinal') {
       
        let month = data.get('month');

        document.querySelector("option[selected]").removeAttribute("selected");
        document.querySelector(`option[value='${month}']`).setAttribute("selected", "");
        let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
        data.set('ordinal', dtm.ordinal);
        document.querySelector("input[name='ordinal']").value = dtm.ordinal;
        document.querySelector("#week").innerHTML = dtm.weekNumber;

    }
    if(key == 'ordinal'){
        
        // let date =  luxon.DateTime.dateFromDay(data.get('year'),data.get('ordinal'));

      let date = new Date(data.get('year'), 0);
        let dt = new Date(date.setDate(data.get('ordinal')));
        date = null;
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        dt = null;
        // let year = dt.getFullYear();
        document.querySelector("option[selected]").removeAttribute("selected");
        document.querySelector(`option[value='${month}']`).setAttribute("selected", "");

        let week = dateTime.local(data.get('year'), month, day).weekNumber;//luxon.DateTime

        document.querySelector("#week").innerHTML = week;

        document.querySelector("input[name='day']").value = day;
        data.set('ordinal', document.querySelector("input[name='ordinal']").value);
        data.set('month', month);
        data.set('day', day);
      
    }
}

let data = new Map([
    ['year', year],
    ['month', month],
    ['day', day],
    ['ordinal', ordinal]
]);

watchInput.data = data;
setInterval(watchInput , 500);
