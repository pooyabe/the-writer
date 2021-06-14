const { app, BrowserWindow } = require("electron");

// Store Data
const Store = require("electron-store");

const store = new Store();
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

  // Check if User finished intro
  let intro_check = store.get("intro.finished", 0);

  if (intro_check) {

    // If user had finished intro, so load the title screen

    win.loadFile("./screens/Title/Title.html");
  } else {
    win.loadFile("./screens/Loading/Loading.html");
  }
  
}

app.whenReady().then(() => {
  createWindow();
});
