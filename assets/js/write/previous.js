jQuery(function ($) {
  // Request for previous writings
  ipcRenderer.send("pre-writings");

  // Receive the response from Main
  ipcRenderer.on("pre-writings", function (e, r) {
    res = JSON.parse(r);
    const date = moment(res[2], 'YYYY-M-D').format('jD jMMMM jYYYY');
    // Show res
    $(".list").append(`
            <li class="list-item" data-lock="lock" data-id="${res[0]}">
                <span>${res[1]}  <small class="pre-date">(${date})</small></span>
                <img src="../../assets/img/write/lock.png" class="lock" />
            </li>
        `);
  });
});
