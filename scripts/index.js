//Text Replies for a few commands:
const help ="\
<b>Welcome to Koushik's CLI</b><br>\
For more help on a command, type 'command name' help.<br>\
<b>ls</b> - Display the available applications<br>\
<b>run</b> - Run the application in either modern or CLIish look<br>\
<b>clear</b>- clear the terminal<br>\
<b>clearscreen</b> - same as 'clear'<br>\
<b>cls</b> - same as 'clear'\
"



// This function initializes the input box i.e the command line.
function getcmd() 
{ cmd = document.getElementsByClassName("inputBox")[0];
return cmd;
}

//This function listens for the 'Enter' event on the command line and calls appropriate commands.
function processCommand(event){  
    if (event.key==='Enter' && cmd.value.trim()!='') {
        event.preventDefault(); // Prevent the default behavior (form submission, line break, etc.)
        let text = cmd.value;
        setTimeout(logCommand(text),200);
        runCommand(text);
    }   
}

/* This function logs the commands on screen i.e creates an paragraph element with class cmdEntered and is inserted before the flex div i.e
 the text input. */
 function logCommand(text,prefix='>') {
    let entered = document.createElement('div');
    entered.classList.add('cmdEntered');
    entered.textContent = prefix + text;
    document.getElementById('in').before(entered);
    cmd.value = '';
    cmd.placeholder = '';
}


// This function clears the screen that is removes all nodes of class cmdEntered.
function clear() {elements=document.getElementsByClassName('cmdEntered');
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
            let a=document.getElementById('in');
            let entered = document.createElement('div');
            entered.classList.add('cmdEntered');
            entered.classList.add('c')
            entered.innerHTML = help;
            a.before(entered);
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