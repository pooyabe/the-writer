function listClicked(identifier) {
  const lock = identifier.getAttribute("data-lock");
  const id = identifier.getAttribute("data-id");
  if (lock == "unlock") {
    ipcRenderer.send("set-pre-writing", id);


    // Open Read writing
    window.open(
    "../Pre/Pre.html",
    "_blank",
    "width=600,height=800,center=true,frame=true,nodeIntegration=true,fullscreen=0,resizable=0"
  );
  } else {
    alert("عجله نداشته باش ، بعدا می‌تونی بخونیش :)");
  }
}
