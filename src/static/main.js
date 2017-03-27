// pull in desired CSS/SASS files
require('./styles/main.scss');

// Load the current session state
// This could be swapped out for localStorage if we want to persist.
var storedState = localStorage.getItem('illuminate-session-state');
var startingState = storedState ? JSON.parse(storedState) : null;

// inject bundled Elm app into div#main
var Elm = require('../elm/Main.elm');
var app = Elm.Main.fullscreen(startingState);

// This port opens a ReportViewer window.
// If the window is already open, this will change the URL
app.ports.openWindow.subscribe(function(url) {
  window.open(url, "ReportViewer", "width=600, height=400");
});

// This port is used to set the current session state.
// This should be used for communication between the two windows.
app.ports.setStorage.subscribe(function(state) {
  localStorage.setItem('illuminate-session-state', JSON.stringify(state));
});

window.addEventListener('storage', function(e) {
  console.log("e: " + JSON.stringify(e));
  if (e.key === "illuminate-session-state")
  app.ports.handleModelChanged.send(JSON.parse(e.newValue));
});
