const { app, BrowserWindow, ipcMain, remote } = require("electron");

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
    frame: false,
    enableRemoteModule: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
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

  // Action Windows
  ipcMain.on("window-action", function (e, action) {
    if (action == "close") {
      app.quit();
    } else if (action == "minimize") {
      win.minimize();
    }
  });
}

/**
 *
 * COMMUNICATE WITH IPC
 *
 */
// ipc messager for check intro finished
ipcMain.on("finished-intro", function (event, msg) {
  store.set("intro.finished", 1);
});
// Get new text title
ipcMain.on("article-title", function (event, msg) {
  // Get now date and store it with title
  const now_date = new Date();
  const now = `${now_date.getFullYear()}-${
    now_date.getMonth() + 1
  }-${now_date.getDate()}`;

  store.set("article.title", msg);
  store.set("article.date", now);
});





app.whenReady().then(() => {
  createWindow();
});
