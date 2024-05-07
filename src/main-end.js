$("#header__desktop").load("/arch/header-desktop.html");
$("#header__mobile").load("/arch/header-mobile.html");
$("#my__footer").load("/arch/footer.html");




getScript('/src/javascript/collapsible-load.js');


getScript('/src/javascript/remove-unnecessary.js');

getScript('/src/javascript/utilities.js');


getScript("/src/javascript/global-msg.js");
    //console.log("\u2705 Global Message Loaded");

//$.getScript("/src/javascript/global-msg.js", function (data, textStatus, jqxhr) {
    //console.log(data); // Data returned
    //console.log(textStatus); // Success
    //console.log(jqxhr.status); // 200
//    console.log("\u2705 Global Message Loaded");
//});



try { endexec() } catch (err) { }

console.log("\u2705 main-end.js v1.4 has been executed")