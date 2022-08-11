class Calc {
    constructor(num1, oper, num2) {
        this.num1 = num1;
        this.num2 = num2;
        this.oper = oper;
    }
    result = function() {
        switch(this.oper) {
            case "+":
                return this.num1 + this.num2;
            case "-":
                return this.num1 - this.num2;
            case "x":
                return this.num1 * this.num2;
            case "/":
                if (this.num2!=0) return this.num1 / this.num2;
                else {
                    document.querySelector(".window span").classList.toggle("open")
                    document.querySelector(".window span").innerHTML = "Школу с первого класса начал прогуливать?";
                    setTimeout(() => {
                        document.querySelector(".window span").innerHTML = "";
                        document.querySelector(".window span").classList.toggle("open")
                    }, 1500);
                    Reset();
                }
        }
    }
}
let mycalc = []; let ff = 0; let del = [];
let num = ""; let res; let rr; 
function getCalculator(event) {
    if (!event.target.closest("button")) return;
    let window = document.querySelector(".window span");
    if (window.innerHTML=="Infinity") {
        Reset();
        window.innerHTML = 0;
    }
    let not = document.querySelectorAll(".not");
    if (String(num).length>13 && (Number.isInteger(+event.target.innerHTML) || event.target.innerHTML==".")) {
        for (let k of not) {
        k.disabled = true;
        }
    }
    else{
        for (let k of not) {
        k.disabled = false;
        }
    }
    if (event.target.innerHTML!="+/-" && event.target.className != "fa fa-refresh" && event.target.className != "icon1" && event.target.innerHTML!="=" && event.target.className!= "fa fa-level-down" && event.target.className != "icon2") {
        if (Number.isInteger(+event.target.innerHTML) ||  event.target.innerHTML==".") {
            if (res!=undefined && (Number.isInteger(+mycalc.at(-1)))) {
                mycalc = [];
                res = undefined;
            }
            if (num!="") window.innerHTML += event.target.innerHTML;
            else if (num=="" || window.innerHTML=="0") window.innerHTML = event.target.innerHTML;
            num += event.target.innerHTML;
            if (num.includes(".")) document.querySelector("#tok").disabled = true;
        } else {
            if (num!="") mycalc.push(num);
            if ((mycalc.length==3 && (Number.isInteger(+mycalc.at(-1)) || String(mycalc.at(-1)).includes("."))) && ((event.target.innerHTML=="+" || event.target.innerHTML=="-") || (["xx", "//"].includes(mycalc.at(-2)+event.target.innerHTML)))) Ravno();
            else if ((mycalc.length==3 && (Number.isInteger(+mycalc.at(-1)))) && (["+", "-"].includes(mycalc.at(-2)) && ["x", "/"].includes(event.target.innerHTML))) del = [+mycalc.shift(), mycalc.shift()];
            if (Number.isInteger(+mycalc.at(-1)) || String(mycalc.at(-1)).includes(".")) mycalc.push(event.target.innerHTML);
            num = "";
        };
    }
    else if (event.target.innerHTML=="=") Ravno();
    else if (event.target.className == "fa fa-refresh" || event.target.className == "icon1"){
        Reset();
        window.innerHTML = 0;
    }
    else if ((event.target.className =="fa fa-level-down" || event.target.className == "icon2") && (num.length>0 || res!=undefined)) {
        if (res!=undefined) {
            if (String(mycalc[0]).length==2 && String(mycalc[0])[0]=="-") mycalc = [0];
            else mycalc = [+(String(mycalc[0]).slice(0, -1))];
            window.innerHTML = mycalc[0];
        }
        else {
            num = num.slice(0, -1);
            window.innerHTML = num;
        }
    }
    else if (event.target.innerHTML=="+/-") {
        if (res!=undefined && Number.isInteger(mycalc.at(-1))) {
            mycalc = [mycalc[0] * -1];
            window.innerHTML = mycalc[0];
        }
        else {
            if (num=="" || num==0) {
                num = "-";
            }
            else if (num=="-") {
                num = "";
            }
            else {
                num = String(+num * -1);
            }
            window.innerHTML = num;
        }
    }
    function Reset() {
        res = undefined;
        mycalc = [];
        num = "";
        del = [];
    }
    function Err(str, num) {
        if (String(num).includes(".")) {
            window.innerHTML = +(String(num).slice(0, 15));
            mycalc = [+(String(num).slice(0, 15))];
        } else {
            window.classList.toggle("open")
            window.innerHTML = str;
            setTimeout(() => {
                window.innerHTML = "";
                window.classList.toggle("open")
            }, 700);
            Reset();
        };
    }
    function Ravno() {
        if (num!="") mycalc.push(num);
        num = "";
        if (mycalc.length>=3) {
            res = new Calc(+mycalc[0], mycalc[1], +mycalc.at(-1));
            if (del.length==0 || ["/", "x"].includes(event.target.innerHTML)){
                if (String(res.result()).length>15){
                    Err("Недопустимое количество символов", res.result());
                }
                else window.innerHTML = res.result();
                mycalc = [res.result()];
            }; 
            if (del[1]=="-" && ["+", "-", "="].includes(event.target.innerHTML)) {
                if (String(del[0] - res.result()).length>15) {
                    Err("Недопустимое количество символов", del[0] - res.result());

                }
                else window.innerHTML = del[0] - res.result();
                mycalc = [del[0] - res.result()];
                Reset();
            }
            if (del[1]=="+" && ["+", "-", "="].includes(event.target.innerHTML)) {
                if  (String(del[0] + res.result()).length>15){
                    Err("Недопустимое количество символов", del[0] + res.result());
                }
                else    window.innerHTML = del[0] + res.result();
                mycalc = [del[0] + res.result()];
                del = [];
            }
        }
        else {
            Err("Недопустимое значение");
        }
    }
}
let container = document.querySelector(".container");
container.addEventListener("click", getCalculator);
