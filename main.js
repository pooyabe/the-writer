const { app, BrowserWindow } = require("electron");


/**
 * Electron Reload
 */
try {
  require("electron-reloader")(module);
} catch (_) {}


function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    fullscreen: 1,
    center: true,
    webPreferences: {
      devTools: false,
      textAreasAreResizable: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
});
