let years = document.querySelectorAll("input[name='year']");

years[0].value = 2023;
years[1].value = 2023;


class Reconvert {
    constructor(years) {
        this.years[0] = years[0].value;
        this.years[1] = years[2].value;
        this.exec = this.exec.bind(this);
    }
    exec() {
        let inyears = document.querySelectorAll("input[name='year']");

        if (this.years[0] != inyears[0].value) {
            inyears[1].value = inyears[0].value;
            this.years[0] = inyears[0].value;
        }
        if (this.years[1] != inyears[1].value) {
            inyears[0].value = inyears[1].value;
            this.years[1] = inyears[1].value;

        }
        return this.years;
    }
}

let convert = new Reconvert(years);

setInterval(convert.exec, 10);
