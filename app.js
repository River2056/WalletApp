const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

const local = window.localStorage;

function daysInMonth(year, month) {
    return parseInt(new Date(year, month + 1, 0).getDate());
}

$(function() {
    const saveBtn = $("#save_btn");
    const saveMsg = $("#save_msg");
    const optBtn = $(".option_btn input");
    const spentBtn = $("#spent_btn");
    const spentMsg = $("#spent_msg");
    const getBal = $("#getbal_box");
    const getMsg = $("#get_bal");
    const calBtn = $("#cal_btn");
    const calRes = $("#cal_result");
    const min = $("#include_min");
    const reload = $("#reload_btn");
    const clear = $("#clear_btn");

    saveBtn.hide();
    spentBtn.hide();

    /**
     * number box section
     */
    $("#num_input").addClass("textbox");

    /**
     * option button
     */
    optBtn.addClass("btn");
    optBtn.val("option");
    optBtn.click(function() {
        $("#save_btn").toggle("fast");
        $("#spent_btn").toggle("fast");
    });

    /**
     * save section
     */
    saveBtn.addClass("btn");
    saveBtn.val("save");
    saveMsg.text("Done Saving!");
    saveMsg.hide();
    saveBtn.click(function() {
        var money = $("#num_input").val();
        local.setItem("myAccount", money);
        $("#save_msg").show();
        setTimeout(() => location.reload(), 2000);
    });
    

    /**
     * spent section
     */
    spentBtn.addClass("btn");
    spentBtn.val("spent");
    spentMsg.text("Done Recording!");
    spentMsg.hide();
    spentBtn.click(function() {
        let spent = $("#num_input").val();
        let account = local.getItem("myAccount");
        let newBalance = account - spent;
        local.setItem("myAccount", newBalance);
        $("#spent_msg").show();
        setTimeout(() => location.reload(), 2000);
    });

    /**
     * display account balance section
     */
    getBal.addClass("btn");
    getBal.val("balance");
    getBal.click(function() {
        let balance = local.getItem("myAccount");
        getMsg.html(`balance: ${ balance }`)
    });

    /**
     * calculate button section
     * money icon on(green) => keep minimum savings == 3000
     * money icon off(white) => don't keep savings, calculate according storage number
     */
    calBtn.addClass("btn");
    calBtn.val("Calculate");
    calBtn.click(function() {
        let left = local.getItem("myAccount");
        let check = $("#include_min").css("backgroundColor");
        if(check == "rgb(255, 255, 255)") {
            left -= 0;
        } else if(check == "rgb(0, 255, 0)") {
            left -= 3000;
        }
        let remain = daysInMonth(year, month);
        remain -= date.getDate();
        left /= remain;
        calRes.html(`${remain} days spend ${left} each`);
    });

    /**
     * change money icon section
     * white <==> green
     */
    min.val("💵");
    min.click(function() {
        if(min.css("backgroundColor") == "rgb(255, 255, 255)") { // if white
            min.css("backgroundColor", "rgb(0, 255, 0)"); // change to green
        } else if (min.css("backgroundColor") == "rgb(0, 255, 0)") { // if green
            min.css("backgroundColor", "rgb(255, 255, 255)"); // change to white
        }
    });

    /**
     * reload button == F5
     */
    reload.addClass("btn");
    reload.val("reload");
    reload.click(function() {
        location.reload();
    });

    /**
     * clear storage button
     * pops a confirm window first, 
     * then clear storage
     */
    clear.addClass("btn clr");
    clear.val("🚨clear data!🚨");
    clear.click(function() {
        let check = confirm("Are you sure you want to clear data?");
        if (check) {
            local.clear();
        }
    });
});