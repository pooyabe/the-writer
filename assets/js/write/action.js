const { ipcRenderer } = electron;

jQuery(function ($) {
  /**
   *
   * Close Window
   *
   */
  $(".close-btn").click(function () {
    var confirm_close = confirm("مطمئنی؟");
    if (confirm_close) {
      ipcRenderer.send("window-action", "close");
    }
  });

  /**
   * 
   * Minimize
   * 
   */
  $(".minimize-btn").click(function () {
      ipcRenderer.send("window-action", "minimize");
  });
});
