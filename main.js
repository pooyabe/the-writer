const { app, BrowserWindow, ipcMain, remote } = require("electron");

// Connect to database
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./DB/database.db");

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
    // win.loadFile("./screens/Write/Write.html");
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

/**
 *
 * Store new content in writints db
 *
 */
ipcMain.on("new-writing", function (event, content) {
  storeData(content)
    .then(() => {
      event.returnValue = 1;
    })
    .catch((e) => {
      event.returnValue = 0;
    });
});

const storeData = async (content) => {
  // WRITING meta
  const title = store.get("article.title");
  const date = store.get("article.date");

  await db.serialize(function () {
    var stmt = db.prepare(
      `INSERT INTO writings(title, content, date) VALUES ("${title}", "${content}", "${date}")`
    );
    stmt.run();
    stmt.finalize();
  });
};

/**
 *
 * Hear for previous writings request and answer
 *
 */
ipcMain.on("pre-writings", function (e) {
  var response = [];
  db.serialize(function () {
    db.each(
      "SELECT id, title, date FROM writings ORDER BY id DESC",
      function (err, row) {
        response = [row.id, row.title, row.date];
        e.reply("pre-writings", JSON.stringify(response));
      }
    );
  });
});

/**
 *
 * Set pre writing id in config and load content
 *
 */
ipcMain.on("set-pre-writing", function (e, id) {
  store.set("article.pre.id", id);
});

ipcMain.on("get-pre-writing", function (e) {
  var id = store.get("article.pre.id");
  db.serialize(function () {
    db.each(
      `SELECT title, date, content FROM writings WHERE id = "${id}"`,
      function (err, row) {
        response = [row.content, row.title, row.date];
        e.reply("get-pre-writing", JSON.stringify(response));
      }
    );
  });
});

// Run window
app.whenReady().then(() => {
  createWindow();
});

// Close DataBase Connection before quiting
app.on("will-quit", function () {
  db.close();
});
