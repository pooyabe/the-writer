jQuery(function ($) {
    moment.loadPersian({
        usePersianDigits: 1,
        dialect: "persian-modern"
    });


    // Request for previous writings
    ipcRenderer.send("get-pre-writing");
  
    // Receive the response from Main
    ipcRenderer.on("get-pre-writing", function (e, r) {
      res = JSON.parse(r);

      // Jalali date of writing
      const jDate = moment(res[2], "YYYY-M-D").format("jD jMMMM jYYYY");
      // Show res
      
      $('.date').html(jDate);
      $('.content').html(res[0]);
      $('.title').html(res[1]);

    });
  });
  