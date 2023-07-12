
// let dateTime = luxon.DateTime;

// alert(dateTime.dateFromDay(2013,125));



// let date = new Date(2023, 0); 
// let dt =  new Date(date.setDate(59));
// alert(dt.getDate());

/* let data = new Map(
  [
    ['year','78'],
    ['name','HIbd'],
    ['email','his@scosm'],
    ['login','meso']
  ]
  );

data.forEach(
  (value, key, map) => {
          let val = document.querySelector(`input[name='${key}']`).value;
          document.querySelector(`#${key}`).innerHTML = val;
  }); */
 


 /*  watchInput.staff = new Map([
    ['year'],
    ['name'],
    ['email'],
    ['login']
  ]);

function watchInput() {
  watchInput.staff.forEach(
    (value, key) => {
      let val = document.querySelector(`input[name='${key}']`).value;
      if (val != watchInput.staff.get(key)) {
        document.querySelector(`#${key}`).innerHTML = val;
        watchInput.staff.set(key, val);
      }
    }
  )
}
setInterval(watchInput, 500); */

/* function duerte() {
  let elem = document.getElementsByTagName("option");
  let text = elem[2].getAttribute("selected");
  let mes = text.innerText; 
  alert(mes);
}

duerte(); */

/*
let dateTime = luxon.DateTime;
let dtm = dateTime.local(2023, 101 );
alert(dtm.ordinal);
*/
let str = "please let me know if it's ok";
let rgx = /[a-z]+\s/;

let result = str.match(rgx);
alert(result)