$(document).ready(function() {
    document.onkeypress=returnKey;
    $("button").on("click", buttonHandler);
});

function buttonHandler(evt) {
    var text = $(this).text();
    if (isOperator(text)){
      text = " " + text + " ";
    }
    var disp = $("#display");
    if ($(this).attr("id") == "delete") {
        var disp_text = disp.val();
        disp.val(disp_text.substring(0, disp_text.length - 1));
    }
    else if (shouldDisplay(text)) {
        disp.val(disp.val() + text);
    } else if (text == "C") {
        disp.val("");
        $("#answer").css("visibility", "hidden");
    } else if (text == "=") {
        evaluate();
    }
}
function isOperator(text){
  return (("+-*/()").indexOf(text) > -1);
}

function shouldDisplay(text) {
    var non_display = ["C", "="];
    return (non_display.indexOf(text) === -1);
}

function evaluate() {
    var result;
    var string = $("#display").val();
    try {
        result = eval($("#display").val());
        $("#answer").text(string + "=");
        $("#answer").css("visibility", "visible");
    } catch (err) {
        result = "Error";
        $("#answer").css("visibility", "hidden");
    }
    $("#display").val(result);


}

function valid_input(myfield, e, dec) {
    var key;
    var keychar;

    if (window.event) {
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return true;
    }
    keychar = String.fromCharCode(key);

    //enter key pressed
    if (key == 13){
      evaluate();
      return false;
    }

    else if (key == null ||
        ("0123456789.*/+-()").indexOf(keychar) > -1) {
        return true;
    } else {
        return false;
    }
}

function returnKey(evt){
  evt.preventDefault();
  var evt = (evt) ? evt: ((event)? event : null);
  if (evt.keyCode == 13){
    evaluate();
  }
}
