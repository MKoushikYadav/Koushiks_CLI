// Variables


// Supporting Functions

/**Fetches html file and loads it into the div*/
async function loadContent(app) {
    switchTab(document.getElementsByClassName(app)[0])
    const content = document.getElementsByClassName(app+"-content")[0];
    content.innerHTML = await (await fetch("./web/"+app+".html")).text();
    addEventListeners(app);
}


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

function addEventListeners(app){
    switch(app){
        case "knowMore":
            addKnowMoreListeners();
            break;
        case "gameConsole":
            addgameConsoleListeners();
            break;
        default:
            break;
    }
}

// Event Listeners


/** Adds EventListeners for all the keys in the keyboard*/
function addKnowMoreListeners() {
    let keys = document.getElementsByClassName("key");
    Array.from(keys).forEach((key) => {
        key.addEventListener("click", () => {
            getKnowMoreOutput(key.classList[0]);
        });
    });
}


function addgameConsoleListeners(){
    let back = document.getElementsByClassName("back")[0];
    back.addEventListener("click", () => {
        switchTab(document.getElementsByClassName("cmdbox")[0]);
    });

}
