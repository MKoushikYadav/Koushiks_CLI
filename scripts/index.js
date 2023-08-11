//Text Replies for a few commands:
const help =
"\
<b>Welcome to Koushik's CLI</b><br>\
For more help on a command, type 'command name' help.<br>\
ls - Display the available applications<br>\
run - Run the application in either modern or CLIish look<br>\
clear - clear the terminal<br>\
clearscreen - same as 'clear'<br>\
cls - same as 'clear'\
"



// This function initializes the input box i.e the command line.
function getcmd() 
{ cmd = document.getElementsByClassName("cmdarea")[0];
return cmd;
}

//This function listens for the 'Enter' event on the command line and calls appropriate commands.
function processCommand(event){  
    if (event.key==='Enter' && cmd.value.trim()!='') {
        event.preventDefault(); // Prevent the default behavior (form submission, line break, etc.)
        let text = cmd.value;
        logCommand(text);
        runCommand(text);
    }   
}

/* This function logs the commands on screen i.e creates an paragraph element with class cmdAreaEntered and is inserted before the flex div i.e
 the text input. */
function logCommand(text,prefix='>') {
    let entered = document.createElement('p');
    entered.classList.add('cmdAreaEntered');
    entered.textContent = prefix + text;
    document.getElementById('flex').before(entered);
    cmd.value = '';
    cmd.placeholder = '';
}


// This function clears the screen that is removes all nodes of class cmdAreaEntered.
function clear() {elements=document.getElementsByClassName('cmdAreaEntered');
        [...elements].forEach((element) => {
            element.remove();
        });}


//This function processes the commands by listening to the input.
function runCommand(text){
    switch (text) {
        // if cls,clear or clearscreen is entered ,it removes all the commands entered from the screen.
        case "cls": case "clear": case "clearscreen":
        
        clear();
        break;
        // if help is entered, a list of commands that can be entered are shown.
        case "help":
            let entered = document.createElement('p');
            entered.classList.add('cmdAreaEntered');
            entered.innerHTML = help;
            document.getElementById('flex').before(entered);
            cmd.value = '';
            cmd.placeholder = '';
            break;
        case "ls":
            
            break;
        default:
        break;
    }
}

getcmd();
cmd.addEventListener("keydown", processCommand);   