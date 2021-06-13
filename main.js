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

  // win.loadFile("./screens/Loading/Loading.html");
  // win.loadFile("./screens/Title/Title.html");
  win.loadFile("./screens/Write/Write.html");
}

app.whenReady().then(() => {
  createWindow();
});
