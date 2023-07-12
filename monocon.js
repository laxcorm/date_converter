let dateTime = luxon.DateTime;
let now = dateTime.now();
let year = now.year;
let options = "<option selected value=1>January</option><option value=2>February</option><option value=3>March</option><option value=4>April</option><option value=5>May</option><option value=6>June</option>" +
    "<option selected value=7>July</option><option value=8>August</option><option value=9>September</option><option value=10>October</option><option value=11>November</option><option value=12>December</option>";


document.querySelector("#month").innerHTML = options;

document.querySelector("input[name='year']").value = year;

// работает!
let month = now.month;
let day = now.day;
let ordinal = now.ordinal;
let week = now.weekNumber;


document.querySelector("input[name='day']").value = day;
document.querySelector("input[name='ordinal']").value = ordinal;
document.querySelector("#week").innerHTML = week;
document.querySelector(`option[value='${month}']`).setAttribute("selected", '');
//////////////////////////////////////////////

function watchInput() {
    watchInput.data.forEach((value, key) => {
        let inval = document.querySelector(`[name='${key}']`).value;
        if (value != inval) {

            inval = Number(inval);
            watchInput.data.set(key, inval);
            //converter(key, watchInput.data);
            if (key != 'ordinal') {
                //var dtm = luxon.DateTime/* .local(data.get('year'), data.get('month'), data.get('day')) */;
                let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
                data.set('ordinal', dtm.ordinal);
                document.querySelector("input[name='ordinal']").value = dtm.ordinal;
                document.querySelector("#week").innerHTML = dtm.weekNumber;
            }
            else
            {
                // let date =  luxon.DateTime.dateFromDay(data.get('year'),data.get('ordinal'));
                let date = new Date(data.get('year'), 0);
                let dt = new Date(date.setDate(data.get('ordinal')));
                let month = dt.getMonth() + 1;
                let day = dt.getDate();
                let week = dateTime.local(data.get('year'), month, day).weekNumber;//luxon.DateTime
                // let year = dt.getFullYear();
                data.set('month', month);
                data.set('day', day);
                document.querySelector("option[selected]").removeAttribute("selected");
                document.querySelector(`option[value='${month}']`).setAttribute("selected", '');
                document.querySelector("#week").innerHTML = week;
                document.querySelector("input[name='day']").value = day;
            }
        }
    });
   
}

//  function converter(key, data) {
//     if (key != 'ordinal') {
//         //var dtm = luxon.DateTime/* .local(data.get('year'), data.get('month'), data.get('day')) */;
//         let dtm = dateTime.local(data.get('year'), data.get('month'), data.get('day'));//luxon.DateTime
//         data.set('ordinal', dtm.ordinal);
//         document.querySelector("input[name='ordinal']").value = dtm.ordinal;
//         document.querySelector("#week").innerHTML = dtm.weekNumber;

//     }
//     else {
//         // let date =  luxon.DateTime.dateFromDay(data.get('year'),data.get('ordinal'));
//         let date = new Date(data.get('year'), 0);
//         let dt = new Date(date.setDate(data.get('ordinal')));
//         let month = dt.getMonth() + 1;
//         let day = dt.getDate();
//         let week = dateTime.local(data.get('year'), month, day).weekNumber;//luxon.DateTime
//         // let year = dt.getFullYear();
//         data.set('month', month);
//         data.set('day', day);
//         document.querySelector("option[selected]").removeAttribute("selected");
//         document.querySelector(`option[value='${month}']`).setAttribute("selected", '');
//         document.querySelector("#week").innerHTML = week;
//         document.querySelector("input[name='day']").value = day;
//     }
// }

let data = new Map([
    ['year', year],
    ['month', month],
    ['day', day],
    ['ordinal', ordinal]
]);

watchInput.data = data;

setInterval(watchInput , 100);