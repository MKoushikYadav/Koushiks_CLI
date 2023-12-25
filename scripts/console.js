
// This function initializes the input box i.e the command line.
function getcmd()
{ cmd = document.getElementsByClassName("inputBox")[0];
return cmd;
}

// This function clears the screen that is removes all nodes of class cmdEntered.
function clear() {elements=document.getElementsByClassName('cmdEntered');
        [...elements].forEach((element) => {
            element.remove();
        });}


/**This function processes the commands by listening to the input.*/    
function runCommand(text){
    text =text;
    switch (text.split(' ')[0]) {
        // if cls,clear or clearscreen is entered ,it removes all the commands entered from the screen.
        case "cls": case "clear": case "clearscreen":
        clear();
        break;
        // if help is entered, a list of commands that can be entered are shown.
        case "help":
            displayResult(helpDialog);
            break;
        case "ls": 
            displayResult(appList);
            break;
        case "run":
            let split = text.toLowerCase().split(' ');
            //runApp(split[1],split[split.length-1]); Future implementation for mode
            runApp(split[1]);

        default:
        break;
    }
}


/**This function logs the output on screen i.e creates an div element with class cmdEntered. */
function displayResult(val,html=true) {
    let entered = document.createElement('div');
    entered.classList.add('cmdEntered');
    if (html)
    entered.innerHTML=val;
    else{
        entered.textContent=val;
    }
    document.getElementById('in').before(entered);
    cmd.value = '';
    cmd.placeholder = '';
}



/**This function runs the app based on parameters i.e app name and the mode to run in(modern and gui). 
Default mode is Modern.*/
function runApp(app,mode="legacy"){
    switch (app){
        case "knowmore": case "knowmore.exe":
            displayResult("Running "+app);
            if(mode=="legacy"){
                loadContent("knowMore");
            }
            else{
                //future implementation
            }
            break;
        case "gameconsole.exe":case "gameconsole":
            displayResult("Running "+"gameConsole",html=false);
            loadContent("gameConsole");
        default:
            displayResult("App not found. Please use \"ls\" to check list of apps.")
            break;
    }
}


/**This function logs the commands on screen i.e creates an paragraph element with class cmdEntered and is inserted before the flex div i.e
 the text input. */
function logCommand(text,prefix='>') {
    let entered = document.createElement('div');
    entered.classList.add('cmdEntered');
    entered.textContent = prefix+text;
    document.getElementById('in').before(entered);
    cmd.value = '';
    cmd.placeholder = '';
}


/**This function listens for the 'Enter' event on the command line and calls appropriate commands.*/
function CommandListener(event){  
    if (event.key==='Enter' && cmd.value.trim()!='') {
        event.preventDefault(); // Prevent the default behavior (form submission, line break, etc.)
        let text = cmd.value;
        setTimeout(logCommand(text),200);
        runCommand(text);
    }   
}

getcmd();
cmd.addEventListener("keydown", CommandListener);   