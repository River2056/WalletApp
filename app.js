var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();

var local = window.localStorage;

function daysInMonth(year, month) {
    return parseInt(new Date(year, month + 1, 0).getDate());
}

$(document).ready(function() {
    $("#save_btn").hide();
    $("#spent_btn").hide();

    /**
     * number box section
     */
    $("#num_input").addClass("textbox");

    /**
     * option button
     */
    $(".option_btn input").addClass("btn");
    $(".option_btn input").val("option");
    $(".option_btn input").click(function() {
        $("#save_btn").toggle("fast");
        $("#spent_btn").toggle("fast");
    });

    /**
     * save section
     */
    $("#save_btn").addClass("btn");
    $("#save_btn").val("save");
    $("#save_msg").text("Done Saving!");
    $("#save_msg").hide();
    $("#save_btn").click(function() {
        var money = $("#num_input").val();
        local.setItem("myAccount", money);
        $("#save_msg").show();
        setTimeout(() => location.reload(), 2000);
    });
    

    /**
     * spent section
     */
    $("#spent_btn").addClass("btn");
    $("#spent_btn").val("spent");
    $("#spent_msg").text("Done Recording!");
    $("#spent_msg").hide();
    $("#spent_btn").click(function() {
        var spent = $("#num_input").val();
        var account = local.getItem("myAccount");
        var newBalance = account - spent;
        local.setItem("myAccount", newBalance);
        $("#spent_msg").show();
        setTimeout(() => location.reload(), 2000);
    });

    /**
     * display account balance section
     */
    $("#getbal_box").addClass("btn");
    $("#getbal_box").val("show balance");
    $("#getbal_box").click(function() {
        var balance = local.getItem("myAccount");
        $("#get_bal").html(`balance: ${ balance }`)
    });

    /**
     * calculate button section
     * money icon on(green) => keep minimum savings == 3000
     * money icon off(white) => don't keep savings, calculate according storage number
     */
    $("#cal_btn").addClass("btn");
    $("#cal_btn").val("Calculate");
    
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
     * change money icon section
     * white <==> green
     */
    $("#include_min").val("💵");
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
    $("#reload_btn").addClass("btn");
    $("#reload_btn").val("reload page");
    $("#reload_btn").click(function() {
        location.reload();
    });

    /**
     * clear storage button
     * pops a confirm window first, 
     * then clear storage
     */
    $("#clear_btn").addClass("btn clr");
    $("#clear_btn").val("🚨clear data!🚨");
    $("#clear_btn").click(function() {
        var check = window.confirm("Are you sure you want to clear data?");
        if (check) {
            local.clear();
        }
    });

});