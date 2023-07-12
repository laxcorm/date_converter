// let DateTime = luxon.DateTime;
// alert((DateTime.local(2018,1,5).weekNumber) + '-' + (DateTime.local(2015,5,23).ordinal));
// alert(DateTime.dateFromDay(2018,125));

let day = document.querySelector("input[name='day']").value;
let month = document.querySelector("select").value;

// let options = "<option selected value=\"january\">January</option><option value=\"february\">February</option><option value=\"march\">March</option><option value=\"april\">April</option><option value=\"may\">May</option><option value=\"june\">June</option>";
let options = "<option selected value=1>January</option><option value=2>February</option><option value=3>March</option><option value=4>April</option><option value=5>May</option><option value=6>June</option>" + 
"<option selected value=7>July</option><option value=8>August</option><option value=9>September</option><option value=10>October</option><option value=11>November</option><option value=12>December</option>";

document.querySelector(".form-select").innerHTML = options;

// let year = luxon.DateTime.now().year;
let year = 2023;

document.querySelectorAll("input[name='year']")[0].value = year;
document.querySelectorAll("input[name='year']")[1].value = year;


function converter(year/* , month, day */) {

  // years.forEach(element=>{if(element!=year){year = element; document.querySelectorAll("input[name='year']").value=year}});
  let years = document.querySelectorAll("input[name='year']");



  // years.forEach(element => {
  //   if(element.value != year){year = element.value; 
  //     (years.indexOf(element) == 0) ? years[1].value = year : years[0].value = year;
  // }
  /* for(let i = 0; i<2; ++i){
    if(years[i].value != year){
      year = years[i].value;
      if(i == 0) {years[1].value = year;}
      else  
      {years[0].value = year;}
      return year;
    }
  } */

  
    if (years[1].value != year) {
      year = years[1].value;
      years[0].value = year;
      return year;
    }
    if (years[0].value != year) {
      year = years[0].value;
      years[1].value = year;
      return year;
    }
  
  return year;
}

let years = document.querySelectorAll("input[name='year']");

function compator(years) {
  let inyears = document.querySelectorAll("input[name='year']");
  
  if (years[0].value != inyears[0].value) {
    inyears[1].value = inyears[0].value;
  }
  if (years[1].value != inyears[1].value) {
    inyears[0].value = inyears[1].value;
  }
  let newyears = document.querySelectorAll("input[name='year']");
  return newyears;
}

setInterval(years = compator, 50, years);

// setInterval(year = converter, 500 , year);

/* if(document.querySelectorAll("input[name='year']")[0].value != year){
  year = document.querySelectorAll("input[name='year']")[0].value;
  document.querySelectorAll("input[name='year']")[1].value = year;
}
if(document.querySelectorAll("input[name='year']")[1].value != year){
  year = document.querySelectorAll("input[name='year']")[1].value;
  document.querySelectorAll("input[name='year']")[0].value = year;
} */



/* let date = new Date(2023, 0); 
  new Date(Date(date.setDate(15)));

  document.querySelector("#date").innerHTML = date;


  const DateTime = luxon.DateTime;
const dt = DateTime.fromObject({year: 2023, ordinal: 132});

document.querySelector("#from").innerHTML = "Month: " + dt.month + " day: " + dt.day;
console.log("Month: " + dt.month + " day: " + dt.day)

let ordinal = DateTime.local(2023, 5, 12).ordinal;
document.querySelector("#ordinal").innerHTML = ordinal; */