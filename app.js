var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();

var accountBalance = document.getElementById("act_bal"); // saves as a string
var local = window.localStorage;

function daysInMonth(year, month) {
    return parseInt(new Date(year, month + 1 , 0).getDate());
}

function getAccount() {
    var balance = local.getItem("myAccount");
    document.getElementById("get_bal").innerHTML = `Your account balance is: ${balance}`;
}

function deduct() {
    var spent = document.getElementById("spent").value;
    var account = parseInt(local.getItem("myAccount"));
    var newBalance = account - spent;
    local.setItem("myAccount", newBalance);
    var changeCSS = document.getElementById("spent_msg");
    changeCSS.classList.remove("hide");
    changeCSS.classList.add("block");
    setTimeout(() => document.location.reload(), 2000);
}

function saveAccount() {
    local.setItem("myAccount", accountBalance.value);
    var changeCSS = document.getElementById("save_msg");
    changeCSS.classList.remove("hide");
    changeCSS.classList.add("block");
    setTimeout(() => document.location.reload(), 2000);
}

function calculate() {
    var left = parseInt(local.getItem("myAccount"));
    var check = document.getElementById("include_min");
    if(check.style.backgroundColor == "rgb(255, 255, 255)") {
        left -= 0
    } else {
        left -= 3000;
    }
    var remain = daysInMonth(year, month);
    remain = remain - date.getDate();
    left = left / remain;
    document.getElementById("cal_result").innerHTML = `${remain} days left! can only spend ${left} each day!`;
}

function changeColor() {
    var min = document.getElementById("include_min");

    if (min.style.backgroundColor == "rgb(255, 255, 255)") {
        min.style.backgroundColor = "rgb(0, 255, 0)";
    } else if (min.style.backgroundColor == "rgb(0, 255, 0)") {
        min.style.backgroundColor = "rgb(255, 255, 255)";
    }
}

function clearStorage() {
    var check = window.confirm("Are you sure you want to clear data?");
    if(check) {
        local.clear();
    }
}

function reloadPage() {
    document.location.reload();
}