jQuery(function () {
  var content;

  /**
   *
   *  Show save link
   *
   */
  $("#text").on("keyup change", function (e) {
    content = $("#text").val();
    if (content != "") {
      $(".save").fadeIn(200);
    } else {
      $(".save").fadeOut(200);
    }
  });

  /**
   *
   * Send content to main process
   *
   */
  $(".save").click(function () {
    content = $("#text").val();

    const confirm_the_save = confirm(
      "آیا متن برای ناشر ارسال بشه؟ توجه داشته باش که تو در حال تمرین روزانه نوشتن هستی ، پس هر برگه‌ای که ثبت می‌کنی ارزش بالایی داره..."
    );
    if (confirm_the_save) {
      $(".save").html("درحال انتشار...");
      if (ipcRenderer.sendSync("new-writing", content)) {

        alert('تبریک می‌گم. نوشته‌ت منتشر شد.\n بهتره یکم استراحت به ذهنت بدی ، پس منتظر برگشتنت می‌مونم :)');

        // Close the app
        ipcRenderer.send("window-action", "close");

      }else{
          alert('یه مشکلی توی ذخیره سازی پیش اومد. لطفا دوباره تلاش کن. و اگر دوباره این پیغام رو دریافت کردی چیزهایی که نوشتی رو یه جای دیگه ذخیره کن و به سازنده اطلاع بده که مشکل وجود داره!');
      }
    }
  });
});
