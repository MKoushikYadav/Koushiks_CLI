// Variables
gameState = 0; // 1 is running. 0 is not running.

// Supporting Functions

/**Fetches html file and loads it into the div*/
async function loadContent(app) {
  switchTab(document.getElementsByClassName(app)[0]);
  const content = document.getElementsByClassName(app + "-content")[0];
  content.innerHTML = await (await fetch("./web/" + app + ".html")).text();
  addEventListeners(app);
}

// loadGame Feature Under Development
// async function loadGame(game) {
//   const gameScreen = document.getElementsByClassName("gameScreen")[0];
//   gameScreen.innerHTML = await (
//     await fetch("../" + game + "/" + game + ".html")
//   ).text();
//   gameState = 1;
//   addGameListeners(game);
// }

/** Switches between tabs named current-tab and background-tab.
 * @param {Element} object - The tab to switch to.
 */
function switchTab(object) {
  let currentTab = document.getElementsByClassName("current-tab")[0];
  currentTab.classList.remove("current-tab");
  currentTab.classList.add("background-tab");
  currentTab.style.display = "none";
  object.classList.remove("background-tab");
  object.classList.add("current-tab");
  object.style.display = "block";
}

/** Prints output to the screen based on the key pressed.
 * @param {String} key - The name of the key pressed.
 */
function getKnowMoreOutput(key) {
  let screen = document.getElementsByClassName("screen")[0];
  switch (key) {
    // if Back Key is pressed
    case "Back":
      switchTab(document.getElementsByClassName("cmdbox")[0]);
      break;

    // if Fact Key is pressed
    case "Fact":
      // Array Length is [0,9] so we have (random%9)-1
      screen.textContent = facts[Math.floor(Math.random() * facts.length)];
      break;

    // if DontPress key is pressed
    case "DontPress":
      screen.textContent = "I told you not to press it.";
      break;

    // Default for other cases
    default:
      screen.innerHTML = keyOutputs[key];
      break;
  }
}

// Event Listeners

function addEventListeners(app) {
  switch (app) {
    case "knowMore":
      addKnowMoreListeners();
      break;
    case "gameConsole":
      addGameConsoleListeners();
      break;
    case "projectViewer":
      addProjectViewerListeners();
    default:
      break;
  }
}

/** Adds EventListeners for all the keys in the keyboard*/
function addKnowMoreListeners() {
  let knowMoreKeys = document.getElementsByClassName("key");
  Array.from(knowMoreKeys).forEach((key) => {
    key.addEventListener("click", () => {
      getKnowMoreOutput(key.classList[0]);
    });
  });
}

function addGameConsoleListeners() {
  let back = document.getElementsByClassName("back")[0];
  back.addEventListener("click", () => {
    switchTab(document.getElementsByClassName("cmdbox")[0]);
  });
  let dinoGameButton = document.getElementsByClassName("dinoGame")[0];
  dinoGameButton.addEventListener("click", () => {
    loadGame("dinoGame");
  });
}

// future Implementation
// function addGameListeners(game) {
//   switch (game) {
//     case "dinoGame":
//       startGame();
//       break;
//     default:
//       break;
//   }
// }

function addProjectViewerListeners() {
  let dialogBox = document.getElementsByClassName("dialogBox");

  Array.from(dialogBox).forEach((dialogBoxInstance) => {
    // Set draggable to true for all dialog boxes
    dialogBoxInstance.setAttribute("draggable", "true");

    // Event listener for drag start
    let draggableElement = dialogBoxInstance;
    if (draggableElement.style.top == ''){
      draggableElement.style.top = 0 + "px";}

    // Event listener for drag
    draggableElement.addEventListener("drag", function (event) {
      let draggableElementCoordinates = draggableElement.getBoundingClientRect();
      // Get the current mouse position during the drag
      let currentMouseX = event.clientX;
      let currentMouseY = event.clientY;
      // Updating the element's position to current position
      draggableElement.style.left =
        currentMouseX - draggableElement.offsetWidth / 2 + "px";
      draggableElement.style.top =
        currentMouseY +
        (parseInt(draggableElement.style.top.slice(0, -2)) -
          draggableElementCoordinates.y) +
        "px";
    });

    draggableElement.addEventListener("dragstart", function (event) {
      // Prevent the default behavior to enable drag
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setDragImage(new Image(), 0, 0);
      // Get the initial mouse position on drag start
    });

    // Event listener for drag end
    draggableElement.addEventListener("dragend", function (event) {
      // Get the final mouse position on drag end
      let finalMouseX = event.clientX;
      let finalMouseY = event.clientY;
      let draggableElementCoordinates = draggableElement.getBoundingClientRect();
      // Updating the element's position to current position
      draggableElement.style.left =
        finalMouseX - draggableElement.offsetWidth / 2 + "px";
      draggableElement.style.top =
        finalMouseY +
        (parseInt(draggableElement.style.top.slice(0, -2)) -
          draggableElementCoordinates.y) +
        "px";
    });

    
  });


}
