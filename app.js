var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();

var local = window.localStorage;

function daysInMonth(year, month) {
    return parseInt(new Date(year, month + 1, 0).getDate());
}

$(document).ready(function() {
    /**
     * save button function
     */
    $("#num_box").click(function() {
        var money = $("#act_bal").val();
        local.setItem("myAccount", money);
        var saveMsg = $("#save_msg");
        saveMsg.toggleClass("hide");
        saveMsg.toggleClass("block");
        setTimeout(() => location.reload(), 2000);

    });

    /**
     * spent button function
     */
    $("#spent_btn").click(function() {
        var spent = $("#spent").val();
        var account = local.getItem("myAccount");
        var newBalance = account - spent;
        local.setItem("myAccount", newBalance);
        var spentMsg = $("#spent_msg");
        spentMsg.toggleClass("hide");
        spentMsg.toggleClass("block");
        setTimeout(() => location.reload(), 2000);
    });

    /**
     * display account balance function
     */
    $("#getbal_box").click(function() {
        var balance = local.getItem("myAccount");
        $("#get_bal").html(`Your account balance is: ${ balance }`)
    });

    /**
     * calculate button function
     * money icon on(green) => keep minimum savings == 3000
     * money icon off(white) => don't keep savings, calculate according storage number
     */
    $("#cal_btn").click(function() {
        var left = local.getItem("myAccount");
        var check = $("#include_min").css("backgroundColor");
        if(check == "rgb(255, 255, 255)") {
            left -= 0;
        } else if(check == "rgb(0, 255, 0)") {
            left -= 3000;
        }
        var remain = daysInMonth(year, month);
        remain -= date.getDate();
        left /= remain;
        $("#cal_result").html(`${remain} days left! can only spend ${left} each day!`);
    });

    /**
     * change money icon background-color
     * white <==> green
     */
    $("#include_min").click(function() {
        var min = $("#include_min");
        if(min.css("backgroundColor") == "rgb(255, 255, 255)") { // if white
            min.css("backgroundColor", "rgb(0, 255, 0)"); // change to green
        } else if (min.css("backgroundColor") == "rgb(0, 255, 0)") { // if green
            min.css("backgroundColor", "rgb(255, 255, 255)"); // change to white
        }
    });

    /**
     * reload button == F5
     */
    $("#reload_btn").click(function() {
        location.reload();
    });

    /**
     * clear storage button
     * pops a confirm window first, 
     * then clear storage
     */
    $("#clear_btn").click(function() {
        var check = window.confirm("Are you sure you want to clear data?");
        if (check) {
            local.clear();
        }
    });

});