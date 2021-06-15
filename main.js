const { app, BrowserWindow, ipcMain } = require("electron");

// Connect to database
const Database = require('better-sqlite3');
const db = new Database(__dirname + '/DB/database.db', {});

// Store Data
const Store = require("electron-store");
const store = new Store();

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

    win.loadFile(__dirname + "/screens/Title/Title.html");
    // win.loadFile("./screens/Write/Write.html");
  } else {
    win.loadFile(__dirname + "/screens/Loading/Loading.html");
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

  const stmt = db.prepare(`INSERT INTO writings(title, content, date) VALUES (?, ?, ?)`);
  const info = stmt.run(title, content, date);
  info.changes;
};

/**
 *
 * Hear for previous writings request and answer
 *
 */
ipcMain.on("pre-writings", function (e) {
  var response = [];

  const stmt = db.prepare('SELECT * FROM writings');

  for (const row of stmt.iterate()) {
    response = [row.id, row.title, row.date];
    e.reply("pre-writings", JSON.stringify(response));
  }
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

  const stmt = db.prepare(`SELECT title, date, content FROM writings WHERE id = ?`);
  const row = stmt.get(id);

  var response = [row.content, row.title, row.date];
  e.reply("get-pre-writing", JSON.stringify(response));
});

// Run window
app.whenReady().then(() => {
  createWindow();
});

// Close DataBase Connection before quiting
app.on("will-quit", function () {
  db.close()
});
