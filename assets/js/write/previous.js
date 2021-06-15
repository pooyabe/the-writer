jQuery(function ($) {
  // Request for previous writings
  ipcRenderer.send("pre-writings");

  // Receive the response from Main
  ipcRenderer.on("pre-writings", function (e, r) {
    res = JSON.parse(r);

    // Check for lock or unlock the writing
    const submit_date = moment(res[2], "YYYY-M-D");
    const today = moment();
    const days_passed = today.diff(submit_date, "days");
    var lock = 'lock';
    if(days_passed >= 3){
        lock = 'unlock';
    }



    // Jalali date of writing
    const jDate = moment(res[2], "YYYY-M-D").format("jD jMMMM jYYYY");


    // Show res
    $(".list").append(`
            <li class="list-item" data-lock="${lock}" data-id="${res[0]}" onClick="listClicked(this);">
                <span>${res[1]} <small class="pre-date">(${jDate})</small></span>
                <img src="../../assets/img/write/${lock}.png" class="lock" />
            </li>
        `);
  });
});
